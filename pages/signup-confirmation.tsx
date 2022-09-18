import Link from 'next/link'
import Head from 'next/head'

import { MainNav } from '@Atoms'
import { SignUpConfirmationOrganism } from '@Organisms'
import { Div } from '@Organisms/SignUp/styledComponent'

const SignUpConfirmation = () => {
  return (
    <>
      <Head>
        <title>SignUpConfirmation</title>
      </Head>
      <MainNav>
        <Link href="/">Home</Link> / <span>Confirme votre e-mail</span>
      </MainNav>
      <Div>
        <SignUpConfirmationOrganism />
      </Div>
    </>
  )
}

export default SignUpConfirmation
