/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@FirebaseConfig/firebase'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { MainNav } from '@Atoms'
import { SignUpConfirmationOrganism } from '@Organisms'
import { Div } from '@Organisms/SignUp/styledComponent'

import * as Types from '@Types'

const SignUpConfirmation = () => {
  const router = useRouter()
  const { emailVerified, uid, name, email } = useSelector<Types.SelectorTypes>(({ auth }) => auth.user) as Types.User
  const [serverErrorMessage, setServerErrorMessage] = useState('')

  console.log('SignUpConfirmation==>', { emailVerified, uid, name, email })



  // async function fetchData() {
  //   await setDoc(doc(db, uid, 'account'), {
  //     name,
  //     email,
  //   })
  //   await setDoc(doc(db, uid, 'wishlist'), {
  //     items: [],
  //   })
  //   await setDoc(doc(db, uid, 'cart'), {
  //     items: [],
  //   })
  // }

  // if (user) {
  //   router.replace('/collections')
  // }

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
