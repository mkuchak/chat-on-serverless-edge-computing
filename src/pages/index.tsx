import type { NextPage } from 'next'
import Head from 'next/head'

import { InputSetting } from '../components/InputSetting'
import { useChatroom } from '../contexts/ChatroomContext'

const Home: NextPage = () => {
  const {
    chatroom: { nickname, room },
    setNickname,
    setRoom,
  } = useChatroom()

  return (
    <>
      <Head>
        <title>Chat</title>
        <meta name="description" content="Chat" />
      </Head>

      <main className="container mx-auto h-screen">
        {!nickname && (
          <InputSetting
            title="Choose a nickname to continue"
            placeholder="Your nickname"
            onSubmit={setNickname}
          />
        )}
        {nickname && !room && (
          <InputSetting
            title="Enter a public room"
            placeholder="Room name"
            onSubmit={setRoom}
          />
        )}
      </main>
    </>
  )
}

export default Home
