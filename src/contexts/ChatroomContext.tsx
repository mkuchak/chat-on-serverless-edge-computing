/* eslint-disable react-hooks/exhaustive-deps */
import Router, { useRouter } from 'next/router'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

export type Message = {
  name?: string;
  timestamp?: number;
  message: string;
  isAlert?: boolean;
};

interface Chatroom {
  room: string;
  nickname: string;
  members: string[];
  messages: Message[];
  isReady: boolean;
  isConnected: boolean;
}

type ChatroomContextProps = {
  chatroom: Chatroom;
  setRoom: (room: string) => void;
  setNickname: (nickname: string) => void;
  sendMessage: (message: string) => void;
};

export const ChatroomContext = createContext({} as ChatroomContextProps)

export function ChatroomProvider ({ children }: PropsWithChildren<{}>) {
  const { room } = useRouter().query as { room: string }

  const [chatroom, setChatroom] = useState<Chatroom>({
    room: '',
    nickname: '',
    members: [],
    messages: [],
    isReady: false,
    isConnected: false,
  })

  const ws = useRef<WebSocket | null>(null)
  const lastSeenTimestamp = useRef<number>(0)

  function sendMessage (message: string) {
    if (!ws.current) return

    ws.current.send(JSON.stringify({ message }))
  }

  function addMember (member: string) {
    setChatroom((chatroom) => ({
      ...chatroom,
      members: [...chatroom.members, member],
    }))
  }

  function removeMember (member: string) {
    setChatroom((chatroom) => ({
      ...chatroom,
      members: chatroom.members.filter((m) => m !== member),
    }))
  }

  function addMessage (data: Message) {
    if (
      data.message &&
      (data.timestamp > lastSeenTimestamp.current || data.isAlert)
    ) {
      setChatroom((chatroom) => ({
        ...chatroom,
        messages: [...chatroom.messages, data],
      }))

      if (!data.isAlert) {
        lastSeenTimestamp.current = data.timestamp
      }
    }
  }

  function addAlertMessage (message: string) {
    if (chatroom.messages.some((m) => m.message === message)) return

    addMessage({
      isAlert: true,
      timestamp: new Date().getTime(),
      message,
    })
  }

  const replaceAccents = (char: string) => {
    const [accent, equivalent] = [
      'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ<,>´`-,~',
      'aaaaaeeeeiiiiooooouuuucAAAAAEEEEÌIIIOOOOOUUUUC          ',
    ]

    return equivalent[accent.indexOf(char)] || char
  }

  function setRoom (room: string) {
    if (!room) return

    setChatroom((chatroom) => ({
      ...chatroom,
      room: room
        .trim()
        .split('')
        .map(replaceAccents)
        .join('')
        .replace(/[^a-zA-Z0-9]/g, ''),
    }))
  }

  function setNickname (nickname: string) {
    setChatroom((chatroom) => ({
      ...chatroom,
      nickname,
    }))
  }

  useEffect(() => {
    if (!chatroom.nickname || !chatroom.room || chatroom.isConnected) return

    ws.current = new WebSocket(
      `wss://${process.env.NEXT_PUBLIC_HOSTNAME}/api/room/${chatroom.room}/websocket`,
    )

    ws.current.addEventListener('open', (event) => {
      ws.current.send(JSON.stringify({ name: chatroom.nickname }))
      setChatroom((chatroom) => ({
        ...chatroom,
        isConnected: true,
      }))
    })

    ws.current.addEventListener('message', (event) => {
      const data = JSON.parse(event.data)

      if (data.ready) {
        addAlertMessage(
          `Welcome to #${chatroom.room} room. <br /> Say hello to everyone, ${chatroom.nickname}!`,
        )
        setChatroom((chatroom) => ({
          ...chatroom,
          isReady: true,
        }))
      } else if (data.joined) {
        addMember(data.joined)
      } else if (data.quit) {
        removeMember(data.quit)
      } else {
        addMessage(data)
      }
    })

    ws.current.addEventListener('close', (event) => {
      console.log('WebSocket closed, reconnecting:', event.code, event.reason)
      setChatroom((chatroom) => ({
        ...chatroom,
        members: [],
        isConnected: false,
      }))
    })

    ws.current.addEventListener('error', (event) => {
      console.log('WebSocket error, reconnecting:', event)
      setChatroom((chatroom) => ({
        ...chatroom,
        members: [],
        isConnected: false,
      }))
    })
  }, [chatroom.isConnected, chatroom.nickname, chatroom.room])

  useEffect(() => {
    if (!chatroom.room && Router.route !== '/') {
      setRoom(room)
    }
    if (chatroom.room && Router.route === '/') {
      Router.push(`/${chatroom.room}`)
    }
  }, [chatroom.room, room])

  return (
    <ChatroomContext.Provider
      value={{
        chatroom,
        setRoom,
        setNickname,
        sendMessage,
      }}
    >
      {children}
    </ChatroomContext.Provider>
  )
}

export const useChatroom = () => useContext(ChatroomContext)
