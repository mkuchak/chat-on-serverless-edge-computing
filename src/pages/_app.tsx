import '../styles/globals.scss'

import type { AppProps } from 'next/app'

import { ChatRoomProvider } from '../contexts/ChatRoomContext'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <ChatRoomProvider>
      <Component {...pageProps} />
    </ChatRoomProvider>
  )
}

export default MyApp
