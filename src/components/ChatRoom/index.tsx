import { useEffect, useRef } from 'react'

import {
  Message as MessageType,
  useChatRoom
} from '../../contexts/ChatRoomContext'
import { HeaderRoom } from './HeaderRoom'
import { InputMessage } from './InputMessage'
import { Message } from './Message'

export function ChatRoom () {
  const chatBox = useRef<HTMLDivElement | null>(null)
  const { room, messages, members } = useChatRoom()

  useEffect(() => {
    chatBox.current.scrollBy(0, 1e8)
  }, [messages])

  return (
    <div className="px-6 pt-8 mx-auto h-screen sm:px-16 xs:px-0 xs:pt-0">
      <div className="flex flex-col w-full h-full bg-slate-800 rounded-tl-3xl rounded-tr-3xl xs:rounded-tl-none xs:rounded-tr-none">
        <HeaderRoom name={room} users={members} />
        <div className="flex overflow-x-hidden relative flex-col justify-end space-y-4 h-screen">
          <div ref={chatBox} className="overflow-y-auto p-8 space-y-4">
            {messages.map(
              ({ name, timestamp, message, isAlert }: MessageType) => (
                <Message
                  key={timestamp}
                  name={name}
                  timestamp={timestamp}
                  isAlert={isAlert}
                >
                  {message}
                </Message>
              )
            )}
          </div>
        </div>
        <InputMessage />
      </div>
    </div>
  )
}
