import { Button, useColorMode } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <div>
      <Head>
        <title>Sasha</title>
        <meta name="description" content="Aboba" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button onClick={toggleColorMode} />
      Hello
    </div>
  )
}

export default Home
