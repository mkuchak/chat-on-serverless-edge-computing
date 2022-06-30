import { FormEvent, useEffect, useRef } from 'react'

import { useChatRoom } from '../../contexts/ChatRoomContext'

export function InputMessage () {
  const { isReady, sendMessage } = useChatRoom()

  const messageInput = useRef(null)

  useEffect(() => {
    messageInput.current.focus()
  }, [])

  function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!messageInput.current.value || !isReady) return

    sendMessage(messageInput.current.value)
    messageInput.current.value = ''
  }

  return (
    <div className="flex items-center py-3 px-3 space-x-3 w-full bg-slate-700 shadow-[0_-10px_30px_-3px_rgba(0,0,0,0.2)] justify-left">
      <button type="button" className="fill-slate-500">
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="32px"
          height="32px"
          viewBox="0 0 106.059 106.059"
          xmlSpace="preserve"
        >
          <g>
            <path
              d="M90.544,90.542c20.687-20.684,20.685-54.341,0.002-75.024C69.858-5.171,36.199-5.171,15.515,15.512
C-5.173,36.199-5.171,69.858,15.517,90.546C36.199,111.23,69.858,111.23,90.544,90.542z M21.302,21.3
C38.796,3.807,67.261,3.805,84.759,21.302c17.494,17.494,17.492,45.963-0.002,63.455c-17.494,17.494-45.96,17.496-63.455,0.003
C3.804,67.262,3.806,38.794,21.302,21.3z M27,69.865c0,0-2.958-11.438,6.705-8.874c0,0,17.144,9.295,38.651,0
c9.662-2.563,6.705,8.874,6.705,8.874c-5.522,16.959-26.031,15.579-26.031,15.579S32.521,86.824,27,69.865z M33.24,38.671
c0-3.424,2.777-6.201,6.201-6.201c3.423,0,6.2,2.777,6.2,6.201c0,3.426-2.777,6.203-6.2,6.203
C36.017,44.874,33.24,42.096,33.24,38.671z M61.357,38.671c0-3.424,2.779-6.201,6.203-6.201c3.423,0,6.2,2.777,6.2,6.201
c0,3.426-2.776,6.203-6.2,6.203S61.357,42.096,61.357,38.671z"
            />
          </g>
        </svg>
      </button>
      <form onSubmit={handleSubmit} className="w-full">
        <label className="flex items-center p-2.5 bg-slate-800 rounded-full shadow">
          <input
            type="text"
            ref={messageInput}
            placeholder="Digite sua mensagem"
            className="pl-2 w-full bg-slate-800 border-transparent focus:border-transparent focus:outline-0 focus:ring-0"
            maxLength={256}
          />
          <button type="submit" className="mr-2">
            <svg
              width="32px"
              height="32px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 2L2 8.66667L11.5833 12.4167M22 2L15.3333 22L11.5833 12.4167M22 2L11.5833 12.4167"
                stroke="#475569"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </label>
      </form>
    </div>
  )
}
