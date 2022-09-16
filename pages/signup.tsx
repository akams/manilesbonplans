/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { sendEmailVerification } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'

import { MainNav } from '@Atoms'
import { SignUpOrganism } from '@Organisms'
import { Div } from '@Organisms/SignUp/styledComponent'

import { auth, db } from '@FirebaseConfig/firebase'

import * as Types from '@Types'

const SignUp = () => {
  const router = useRouter()
  const user = useSelector<Types.SelectorTypes>(({ auth }) => auth.user) as Types.User
  const [serverErrorMessage, setServerErrorMessage] = useState('')

  const useFormMethods = useForm<Types.SignUpFormData>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    mode: 'onTouched',
  })

  // if (user) {
  //   router.replace('/collections')
  // }

  const submitHandler = async ({ email, password, name }: Types.SignUpFormData) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      const { uid, emailVerified } = user

      if (!emailVerified) {
        sendEmailVerification(user)
        return router.replace('/signup-confirmation')
      }

      return router.replace('/collections')

      // await setDoc(doc(db, uid, 'account'), {
      //   name,
      //   email,
      // })
      // await setDoc(doc(db, uid, 'wishlist'), {
      //   items: [],
      // })
      // await setDoc(doc(db, uid, 'cart'), {
      //   items: [],
      // })
    } catch (error) {
      //@ts-ignore
      const errorCode = error.code
      console.error(error)

      if (errorCode === 'auth/email-already-in-use') {
        setServerErrorMessage('Email address already in use.')
      } else {
        setServerErrorMessage('Something went wrong.')
      }
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <MainNav>
        <Link href="/">Home</Link> / <span>Sign Up</span>
      </MainNav>
      <Div>
        {user ? (
          <>
            <p>
              You are signed in as <span className="bold">{user.email}</span>.
              You ll now be redirected.
            </p>
          </>
        ) : (
          <FormProvider {...useFormMethods}>
            <SignUpOrganism
              serverErrorMessage={serverErrorMessage}
              submitHandler={submitHandler}
            />
          </FormProvider>
        )}
        <p className="info">
          Do you have an account? <Link href="/signin">Sign In</Link>
        </p>
      </Div>
    </>
  )
}

export default SignUp
