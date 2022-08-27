import { FormEvent, useEffect, useRef } from 'react'

type InputSettingProps = {
  title: string;
  placeholder: string;
  maxLength?: number;
  onSubmit: (value: string) => void;
};

export function InputSetting ({
  title,
  placeholder,
  maxLength = 32,
  onSubmit,
}: InputSettingProps) {
  const settingInput = useRef(null)

  useEffect(() => {
    settingInput.current.focus()
  }, [])

  function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!settingInput.current.value) return

    onSubmit(settingInput.current.value)
    settingInput.current.value = ''
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex h-screen max-w-[36rem] flex-col items-center justify-center px-8 sm:px-16 xxs:px-2 xxs:text-center"
    >
      <div className="justify-left flex w-full items-center space-x-5 rounded-t-lg bg-slate-700 px-8 pt-3">
        <p className="overflow-auto text-xl font-semibold">{title}</p>
      </div>
      <div className="justify-left flex w-full items-center space-x-3 rounded-b-lg bg-slate-700 p-3">
        <label className="flex w-full items-center rounded-full bg-slate-800 p-2.5 shadow">
          <input
            type="text"
            ref={settingInput}
            placeholder={placeholder}
            className="w-full border-transparent bg-transparent pl-2 focus:border-transparent focus:outline-0 focus:ring-0"
            maxLength={maxLength}
          />
          <button type="submit" className="h-8 w-8 fill-slate-500 pr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32px"
              height="32px"
              viewBox="0 0 52 52"
              enableBackground="new 0 0 52 52"
              xmlSpace="preserve"
            >
              <path
                d="M3.4,29h33.2c0.9,0,1.3,1.1,0.7,1.7l-9.6,9.6c-0.6,0.6-0.6,1.5,0,2.1l2.2,2.2c0.6,0.6,1.5,0.6,2.1,0L49.5,27
 c0.6-0.6,0.6-1.5,0-2.1L32,7.4c-0.6-0.6-1.5-0.6-2.1,0l-2.1,2.1c-0.6,0.6-0.6,1.5,0,2.1l9.6,9.6c0.6,0.7,0.2,1.8-0.7,1.8H3.5
 C2.7,23,2,23.6,2,24.4v3C2,28.2,2.6,29,3.4,29z"
              />
            </svg>
          </button>
        </label>
      </div>
    </form>
  )
}
