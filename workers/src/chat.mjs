async function handleErrors (request, func) {
  try {
    return await func()
  } catch (err) {
    if (request.headers.get('Upgrade') === 'websocket') {
      const [client, server] = Object.values(new WebSocketPair())
      server.accept()
      server.send(JSON.stringify({ error: err.stack }))
      server.close(1011, 'Uncaught exception during session setup')
      return new Response(null, { status: 101, webSocket: client })
    } else {
      return new Response(err.stack, { status: 500 })
    }
  }
}

async function handleApiRequest (path, request, env) {
  if (path[0] === 'room') {
    const name = path[1]

    if (name.length > 32) {
      return new Response('Name too long', { status: 404 })
    }

    const id = env.rooms.idFromName(name)
    const roomObject = env.rooms.get(id)

    const newUrl = new URL(request.url)
    newUrl.pathname = '/' + path.slice(2).join('/')

    return roomObject.fetch(newUrl, request)
  }

  return new Response('Not found', { status: 404 })
}

export class ChatRoom {
  constructor (state, env) {
    this.storage = state.storage
    this.env = env
    this.sessions = []
    this.lastTimestamp = 0
  }

  async fetch (request) {
    return await handleErrors(request, async () => {
      const url = new URL(request.url)

      if (url.pathname === '/websocket') {
        if (request.headers.get('Upgrade') !== 'websocket') {
          return new Response('expected websocket', { status: 400 })
        }

        const [client, server] = Object.values(new WebSocketPair())
        await this.handleSession(server)
        return new Response(null, { status: 101, webSocket: client })
      }

      return new Response('Not found', { status: 404 })
    })
  }

  async handleSession (webSocket) {
    webSocket.accept()

    const session = { webSocket, recoverMessages: [] }
    this.sessions.push(session)

    this.sessions.forEach((otherSession) => {
      if (otherSession.name) {
        session.recoverMessages.push(
          JSON.stringify({ joined: otherSession.name }),
        )
      }
    })

    const storage = await this.storage.list({ reverse: true, limit: 100 })
    const oldMessages = [...storage.values()].reverse()

    oldMessages.forEach((value) => {
      session.recoverMessages.push(value)
    })

    let messagesAlreadyRecovered = false

    webSocket.addEventListener('message', async (msg) => {
      try {
        if (session.quit) {
          webSocket.close(1011, 'WebSocket broken.')
          return
        }

        let data = JSON.parse(msg.data)

        if (!messagesAlreadyRecovered) {
          session.name = String(data.name || 'anonymous')

          if (session.name.length > 32) {
            webSocket.send(JSON.stringify({ error: 'Name too long.' }))
            webSocket.close(1009, 'Name too long.')
            return
          }

          session.recoverMessages.forEach((queued) => {
            webSocket.send(queued)
          })
          delete session.recoverMessages

          this.broadcast({ joined: session.name })
          webSocket.send(JSON.stringify({ ready: true }))

          messagesAlreadyRecovered = true
          return
        }

        data = { name: session.name, message: String(sentMessage.message) }

        if (data.message.length > 256) {
          webSocket.send(JSON.stringify({ error: 'Message too long.' }))
          return
        }

        data.timestamp = Math.max(Date.now(), this.lastTimestamp + 1)
        this.lastTimestamp = data.timestamp

        const dataStringify = JSON.stringify(data)
        this.broadcast(dataStringify)

        const key = new Date(data.timestamp).toISOString()
        await this.storage.put(key, dataStringify)
      } catch (err) {
        webSocket.send(JSON.stringify({ error: err.stack }))
      }
    })

    const closeOrErrorHandler = (evt) => {
      session.quit = true

      this.sessions = this.sessions.filter((member) => member !== session)

      if (session.name) {
        this.broadcast({ quit: session.name })
      }
    }

    webSocket.addEventListener('close', closeOrErrorHandler)
    webSocket.addEventListener('error', closeOrErrorHandler)
  }

  broadcast (message) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message)
    }

    const quitters = []
    this.sessions = this.sessions.filter((session) => {
      if (session.name) {
        try {
          session.webSocket.send(message)

          return true
        } catch (err) {
          session.quit = true
          quitters.push(session)

          return false
        }
      } else {
        session.recoverMessages.push(message)

        return true
      }
    })

    quitters.forEach((quitter) => {
      if (quitter.name) {
        this.broadcast({ quit: quitter.name })
      }
    })
  }
}

export default {
  async fetch (request, env) {
    return await handleErrors(request, async () => {
      const url = new URL(request.url)
      const path = url.pathname.slice(1).split('/')

      if (path[0] === 'api') {
        return handleApiRequest(path.slice(1), request, env)
      }

      return new Response('Not found', { status: 404 })
    })
  },
}
