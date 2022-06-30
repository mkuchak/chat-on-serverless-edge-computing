import Head from 'next/head'

import { ChatRoom } from '../components/ChatRoom'
import { InputSetting } from '../components/InputSetting'
import { useChatRoom } from '../contexts/ChatRoomContext'

export default function Room () {
  const { nickname, setNickname, room, members } = useChatRoom()

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
            title="Escolha um apelido para prosseguir"
            placeholder="Digite seu nome"
            onSubmit={setNickname}
          />
        )}
        {nickname && room && <ChatRoom />}
      </main>
    </>
  )
}
