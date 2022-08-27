import { FormEvent, useEffect, useRef } from 'react'

import { IconNextStep } from '../Icons/IconNextStep'

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
            <IconNextStep />
          </button>
        </label>
      </div>
    </form>
  )
}
