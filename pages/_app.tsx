import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import store from '@Store'

import { Container, NavBar, ChooseGender, ChooseCategoryProduct } from '@Atoms'
import {
  ReactReduxFirebaseProvider,
} from '@Molecules'
import * as locales from '@Locale'
import GlobalStyle from '@Styles'

const queryClient = new QueryClient();

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
            <QueryClientProvider client={queryClient}>
              <NavBar />
              <ChooseGender />
              <ChooseCategoryProduct />
              <IntlProvider
                //@ts-ignore
                locale={locale}
                defaultLocale={defaultLocale}
                messages={messages}
              >
                <Component {...pageProps} />
              </IntlProvider>
            </QueryClientProvider>
          </ReactReduxFirebaseProvider>
        </Provider>
      </Container>
    </>
  )
}

export default MyApp
