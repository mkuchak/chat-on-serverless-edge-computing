import Head from 'next/head'

import { Chatroom } from '../components/Chatroom'
import { InputSetting } from '../components/InputSetting'
import { useChatroom } from '../contexts/ChatroomContext'

export default function Room () {
  const {
    chatroom: { nickname, room, members },
    setNickname,
  } = useChatroom()

  return (
    <>
      <Head>
        <title>
          #{room} {members.length ? `(${members.join(', ')})` : ''}
        </title>
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
        {nickname && room && <Chatroom />}
      </main>
    </>
  )
}
