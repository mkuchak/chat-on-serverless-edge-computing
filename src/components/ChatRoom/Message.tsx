// @ts-ignore
import colorFromString from 'consistent-color-generation'
import { memo, ReactNode } from 'react'

import { classNames } from '../../utils/classNames'

type MessageProps = {
  name?: string;
  timestamp?: number;
  children: ReactNode;
  isAlert?: boolean;
};

export const Message = memo(
  ({
    name = 'Anonymous',
    timestamp = new Date().getTime() / 1000,
    children: message,
    isAlert = false
  }: MessageProps) => {
    if (!message) return

    if (isAlert) {
      return (
        <div className="flex justify-center">
          <div className="flex py-2 px-3 text-xs text-center bg-slate-700 rounded-lg shadow">
            <div dangerouslySetInnerHTML={{ __html: message as string }}></div>
          </div>
        </div>
      )
    }

    const color = colorFromString(name, undefined, 100, 70)

    return (
      <div className="flex items-center space-x-4">
        <div
          className={classNames(
            'flex justify-center items-center min-w-[2.5rem] min-h-[2.5rem]',
            'text-2xl font-semibold rounded-full shadow select-none'
          )}
          style={{ ['backgroundColor' as string]: color }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
        <div
          className={classNames(
            'flex flex-col py-2 px-3 bg-slate-700 rounded-tl-3xl',
            'rounded-tr-3xl rounded-br-3xl shadow'
          )}
        >
          <div
            className="text-sm font-semibold"
            style={{ ['color' as string]: color }}
          >
            {name}
          </div>
          <div className="flex flex-row space-x-2">
            <div className="[word-break:break-word]">{message}</div>
            <div className="flex items-end text-[0.7rem] text-slate-400 whitespace-nowrap">
              {new Date(timestamp).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'America/Sao_Paulo'
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

Message.displayName = 'Message'
