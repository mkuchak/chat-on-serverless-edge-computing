import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Next.js Boilerplate</title>
        <meta
          name="description"
          content="Next.js description for boilerplate page"
        />
      </Head>

      <main className={styles.main}>
        <div>
          <Image src="/boilerplate.svg" alt="Favicon" width={64} height={64} />{' '}
          Hello, <a href="#">boilerplate!</a>
        </div>
      </main>
    </>
  )
}

export default Home
