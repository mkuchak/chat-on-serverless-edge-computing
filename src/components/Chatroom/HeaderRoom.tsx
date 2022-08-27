import clsx from 'clsx'
import colorFromString from 'consistent-color-generation'

type HeaderRoomProps = {
  name: string;
  users: string[];
};

export function HeaderRoom ({ name, users }: HeaderRoomProps) {
  const color = colorFromString(name, undefined, 100, 70)

  return (
    <div
      className={clsx(
        'relative flex w-full items-center space-x-4 rounded-t-3xl py-3 px-8',
        'bg-slate-700 shadow-[0_10px_30px_-3px_rgba(0,0,0,0.2)] xs:rounded-t-none',
      )}
    >
      <div
        className={clsx(
          'flex min-h-[3rem] min-w-[3rem] select-none items-center justify-center',
          'rounded-full text-4xl font-semibold shadow',
        )}
        style={{ backgroundColor: color }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="relative flex w-[calc(100%-7rem)] flex-col">
        <p className="truncate text-xl font-semibold">#{name}</p>
        <p className="truncate text-slate-300">{users.join(', ')}</p>
      </div>
    </div>
  )
}
