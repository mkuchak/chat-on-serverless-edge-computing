// @ts-ignore
import colorFromString from 'consistent-color-generation'

type HeaderRoomProps = {
  name: string;
  users: string[];
};

export function HeaderRoom ({ name, users }: HeaderRoomProps) {
  const color = colorFromString(name, undefined, 100, 70)

  return (
    <div className="flex relative items-center py-3 px-8 space-x-4 w-full bg-slate-700 rounded-tl-3xl rounded-tr-3xl shadow-[0_10px_30px_-3px_rgba(0,0,0,0.2)] xs:rounded-tl-none xs:rounded-tr-none">
      <div
        className="flex justify-center items-center min-w-[3rem] min-h-[3rem] text-4xl font-semibold rounded-full shadow select-none"
        style={{ ['backgroundColor' as string]: color }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="flex relative flex-col w-[calc(100%-7rem)]">
        <p className="text-xl font-semibold truncate">#{name}</p>
        <p className="text-slate-300 truncate">{users.join(', ')}</p>
      </div>
    </div>
  )
}
