import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import clsx from 'clsx'
import { FormEvent, useEffect, useRef, useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

import { useChatroom } from '../../contexts/ChatroomContext'
import { IconEmojis } from '../Icons/IconEmojis'
import { IconSendMessage } from '../Icons/IconSendMessage'

interface EmojiPickerProps {
  id: string;
  shortcodes: string;
  native: string;
  size: number;
  fallback: string;
  set: string;
  skin: number;
}

export function InputMessage () {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)
  const { isReady, sendMessage } = useChatroom()
  const [message, setMessage] = useState('')
  const messageInput = useRef(null)

  useEffect(() => {
    messageInput.current.focus()
  }, [])

  function handleSendMessage (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!message || !isReady) return

    sendMessage(message)
    setMessage('')
  }

  return (
    <div
      className={clsx(
        'justify-left flex w-full items-center',
        'bg-slate-700 p-3 shadow-[0_-10px_30px_-3px_rgba(0,0,0,0.2)]',
      )}
    >
      <OutsideClickHandler onOutsideClick={() => setIsEmojiOpen(false)}>
        <div
          className={clsx('absolute bottom-16', { hidden: !isEmojiOpen })}
        >
          <Picker
            data={data}
            onEmojiSelect={(emoji: EmojiPickerProps) => {
              setMessage(`${message}${emoji.native}`)
              setIsEmojiOpen(false)
            }}
            theme="dark"
            maxFrequentRows={1}
            perLine={6}
            previewPosition="none"
            navPosition="bottom"
            searchPosition="none"
          />
        </div>
      </OutsideClickHandler>
      <button
        type="button"
        className="mr-3 fill-slate-500"
        onClick={() => setIsEmojiOpen((state) => !state)}
      >
        <IconEmojis />
      </button>
      <form onSubmit={handleSendMessage} className="w-full">
        <label className="flex items-center rounded-full bg-slate-800 p-2.5 shadow">
          <input
            type="text"
            ref={messageInput}
            placeholder="Type a message..."
            className={clsx(
              'w-full border-transparent bg-slate-800 pl-2',
              'focus:border-transparent focus:outline-0 focus:ring-0',
            )}
            maxLength={256}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="mr-2">
            <IconSendMessage />
          </button>
        </label>
      </form>
    </div>
  )
}
