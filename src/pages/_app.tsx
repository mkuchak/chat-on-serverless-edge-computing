import '../styles/globals.scss'

import type { AppProps } from 'next/app'

import { ChatroomProvider } from '../contexts/ChatroomContext'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <ChatroomProvider>
      <Component {...pageProps} />
    </ChatroomProvider>
  )
}

export default MyApp
