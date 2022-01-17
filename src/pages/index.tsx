import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FaReact } from 'react-icons/fa'

import styles from '../styles/Home.module.scss'
import { classNames } from '../utils/classNames'

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
        <h1
          className={classNames(
            'flex items-center my-8 text-4xl font-extrabold text-slate-900 capitalize'
          )}
        >
          <FaReact size="48" className="mr-3 text-sky-400" />
          Make it fast.
        </h1>
        <button>
          <Image src="/favicon.svg" alt="Favicon" width={64} height={64} />{' '}
          Hello, <a href="#">boilerplate!</a>
        </button>
      </main>
    </>
  )
}

export default Home
