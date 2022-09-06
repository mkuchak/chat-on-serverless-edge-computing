import { RefObject, useEffect, useState } from 'react'

export const useShouldScrollToBottom = (ref: RefObject<HTMLElement>) => {
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, offsetHeight } = ref.current!
      const isScrolledToBottom =
        Math.ceil(scrollTop + offsetHeight) >= scrollHeight

      setShouldScrollToBottom(isScrolledToBottom)
    }

    const { current } = ref

    if (current) {
      current.addEventListener('scroll', handleScroll)

      return () => {
        current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [ref])

  return { shouldScrollToBottom }
}
