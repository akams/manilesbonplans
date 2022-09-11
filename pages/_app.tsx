import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import * as locales from '@Locale'

import GlobalStyle from '@Styles'
import { Container } from '@Atoms'

import store from '@Store'
import {
  NavBar,
  ReactReduxFirebaseProvider,
} from '@Atoms'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const { locale, defaultLocale } = router
  //@ts-ignore
  const messages = locales[locale]
  return (
    <>
      <Head>
        <title>Mani les bons plans</title>
      </Head>
      <GlobalStyle />
      <Container>
        <Provider store={store}>
          <ReactReduxFirebaseProvider>
            <NavBar />
            <IntlProvider
              //@ts-ignore
              locale={locale}
              defaultLocale={defaultLocale}
              messages={messages}
            >
              <Component {...pageProps} />

            </IntlProvider>
          </ReactReduxFirebaseProvider>
        </Provider>
      </Container>
    </>
  )
}

export default MyApp
