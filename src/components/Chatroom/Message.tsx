import 'animate.css'

import clsx from 'clsx'
import colorFromString from 'consistent-color-generation'
import { memo, ReactNode } from 'react'

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
    isAlert = false,
  }: MessageProps) => {
    if (!message) return

    if (isAlert) {
      return (
        <div className="flex justify-center">
          <div className="flex rounded-lg bg-slate-700 py-2 px-3 text-center text-xs shadow">
            <div dangerouslySetInnerHTML={{ __html: message as string }}></div>
          </div>
        </div>
      )
    }

    const color = colorFromString(name, undefined, 100, 70)

    return (
      <div className="animate__animated animate__fadeIn flex items-center space-x-4">
        <div
          className={clsx(
            'flex min-h-[2.5rem] min-w-[2.5rem] items-center justify-center',
            'select-none rounded-full text-2xl font-semibold shadow',
          )}
          style={{ ['backgroundColor' as string]: color }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
        <div
          className={clsx(
            'flex flex-col rounded-tl-3xl bg-slate-700 py-2 px-3',
            'rounded-r-3xl shadow',
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
            <div className="flex items-end whitespace-nowrap text-[0.7rem] text-slate-400">
              {new Date(timestamp).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'America/Sao_Paulo',
              })}
            </div>
          </div>
        </div>
      </div>
    )
  },
)

Message.displayName = 'Message'
