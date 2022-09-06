import clsx from 'clsx'
import { useEffect, useRef } from 'react'

import {
  Message as MessageType,
  useChatroom,
} from '../../contexts/ChatroomContext'
import { useShouldScrollToBottom } from '../../hooks/useShouldScrollToBottom'
import { IconLoader } from '../Icons/IconLoader'
import { HeaderRoom } from './HeaderRoom'
import { InputMessage } from './InputMessage'
import { Message } from './Message'

export function Chatroom () {
  const chatBox = useRef<HTMLDivElement | null>(null)
  const { room, messages, members, isReady } = useChatroom()
  const { shouldScrollToBottom } = useShouldScrollToBottom(chatBox)

  useEffect(() => {
    if (shouldScrollToBottom) {
      chatBox.current?.scrollTo(0, chatBox.current.scrollHeight)
    }
  }, [messages, isReady, shouldScrollToBottom])

  return (
    <div className="mx-auto h-screen px-6 pt-8 sm:px-16 xs:px-0 xs:pt-0">
      <div className="flex h-full w-full flex-col rounded-t-3xl bg-slate-800 xs:rounded-t-none">
        <HeaderRoom name={room} users={members} />
        <div className="relative flex h-screen flex-col justify-end overflow-x-hidden">
          <div
            className={clsx('flex h-full items-center justify-center', {
              hidden: isReady,
            })}
          >
            <IconLoader />
          </div>
          <div
            ref={chatBox}
            className={clsx('space-y-4 overflow-y-auto p-8', {
              hidden: !isReady,
            })}
          >
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
              ),
            )}
          </div>
        </div>
        <InputMessage />
      </div>
    </div>
  )
}
