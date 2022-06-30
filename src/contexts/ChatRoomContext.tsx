import Router, { useRouter } from 'next/router'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

export type Message = {
  name?: string;
  timestamp?: number;
  message: string;
  isAlert?: boolean;
};

type ChatRoomContextProps = {
  nickname: string;
  setNickname: (nickname: string) => void;
  room: string;
  setNormalizedRoom: (room: string | string[]) => void;
  sendMessage: (message: string) => void;
  messages: Message[];
  members: string[];
  addMember: (member: string) => void;
  isReady: boolean;
};

type ChatRoomProviderProps = {
  children: ReactNode;
};

export const ChatRoomContext = createContext({} as ChatRoomContextProps)

export function ChatRoomProvider ({ children }: ChatRoomProviderProps) {
  const { room: roomFromQuery } = useRouter().query

  const [nickname, setNickname] = useState('')
  const [room, setRoom] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [members, setMembers] = useState<string[]>([])

  const [isReady, setIsReady] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const hostname = 'chat.kuch.workers.dev'
  // const hostname = 'edge-chat-demo.cloudflareworkers.com'
  const ws = useRef<WebSocket | null>(null)
  const lastSeenTimestamp = useRef<number>(0)

  useEffect(() => {
    if (!nickname || !room || isConnected) return

    ws.current = new WebSocket(
      'wss://' + hostname + '/api/room/' + room + '/websocket'
    )

    ws.current.addEventListener('open', (event) => {
      ws.current.send(JSON.stringify({ name: nickname }))
      setIsConnected(true)
    })

    ws.current.addEventListener('message', (event) => {
      const data = JSON.parse(event.data)

      if (data.joined) {
        addMember(data.joined)
      } else if (data.quit) {
        removeMember(data.quit)
      } else if (data.ready) {
        addAlertMessage(
          `Bem-vindo(a) a sala #${room}. <br /> Diga olá a todos, ${nickname}!`
        )
        setIsReady(true)
      } else {
        addMessage(data)
      }
    })

    ws.current.addEventListener('close', (event) => {
      console.log('WebSocket closed, reconnecting:', event.code, event.reason)
      setMembers([])
      setIsConnected(false)
    })

    ws.current.addEventListener('error', (event) => {
      console.log('WebSocket error, reconnecting:', event)
      setMembers([])
      setIsConnected(false)
    })
  }, [isConnected, nickname, room])

  function sendMessage (message: string) {
    if (!ws.current) return

    ws.current.send(JSON.stringify({ message }))
  }

  function addMember (member: string) {
    setMembers((members) => [...members, member])
  }

  function removeMember (member: string) {
    setMembers((members) => members.filter((m) => m !== member))
  }

  function addMessage (data: Message) {
    if (
      data.message &&
      (data.timestamp > lastSeenTimestamp.current || data.isAlert)
    ) {
      setMessages((messages) => [...messages, data])
      if (!data.isAlert) {
        lastSeenTimestamp.current = data.timestamp
      }
    }
  }

  function addAlertMessage (message: string) {
    if (messages.some((m) => m.message === message)) return

    addMessage({
      isAlert: true,
      timestamp: new Date().getTime(),
      message
    })
  }

  function setNormalizedRoom (room: string | string[]) {
    if (!room) return

    room = room as string

    if (room[0] === '#') {
      room = room.substring(1)
    }

    const accentedList =
      'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ<,>´`-,~'
    const unaccentedList =
      'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC          '

    setRoom(
      room
        .trim()
        .toLowerCase()
        .replace(/_/g, '-')
        .split('')
        .map((char) => {
          const charIndex = accentedList.indexOf(char)
          if (charIndex !== -1) {
            return unaccentedList[charIndex]
          }
          return char
        })
        .join('')
        .replace(/[^a-zA-Z0-9]/g, '')
    )
  }

  useEffect(() => {
    if (!room && Router.route !== '/') {
      setNormalizedRoom(roomFromQuery)
    }
    if (room && Router.route === '/') {
      Router.push(`/${room}`)
    }
  }, [room, roomFromQuery])

  return (
    <ChatRoomContext.Provider
      value={{
        nickname,
        setNickname,
        room,
        setNormalizedRoom,
        sendMessage,
        messages,
        members,
        addMember,
        isReady
      }}
    >
      {children}
    </ChatRoomContext.Provider>
  )
}

export const useChatRoom = () => useContext(ChatRoomContext)
