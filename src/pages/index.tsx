import type { NextPage } from 'next'
import Head from 'next/head'

import { InputSetting } from '../components/InputSetting'
import { useChatRoom } from '../contexts/ChatRoomContext'

const Home: NextPage = () => {
  const { nickname, room, setNickname, setNormalizedRoom } = useChatRoom()

  return (
    <>
      <Head>
        <title>Chat</title>
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
        {nickname && !room && (
          <InputSetting
            title="Entre em uma sala pública"
            placeholder="Digite o nome da sala"
            onSubmit={setNormalizedRoom}
          />
        )}
      </main>
    </>
  )
}

export default Home
