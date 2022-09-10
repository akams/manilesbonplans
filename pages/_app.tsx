import { Provider } from 'react-redux'
import Head from 'next/head'
import type { AppProps } from 'next/app'

import GlobalStyle from '@Styles'
import { Container } from '@Atoms'

import store from '@Store'
import {
  NavBar,
  ReactReduxFirebaseProvider,
} from '@Atoms'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Tiptop</title>
      </Head>
      <GlobalStyle />
      <Container>
        <Provider store={store}>
          <ReactReduxFirebaseProvider>
            <NavBar />
            <Component {...pageProps} />
          </ReactReduxFirebaseProvider>
        </Provider>
      </Container>
    </>
  )
}

export default MyApp
