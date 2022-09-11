// import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import type { NextPage } from 'next'
// import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'

import { SignInOrganism } from '@Organisms'
import { MainNav } from '@Atoms'
import { Div } from '@Organisms/SignIn/styledComponent'

import * as Types from '@Types'

// import { auth } from '../services/firebase-config'

const SignIn: NextPage = () => {
  const router = useRouter()
  //@ts-ignore
  const user = useSelector((state) => state.auth.user)

  if (user) {
    router.replace('/collections')
  }

  const useFormMethods = useForm<Types.SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  })


  // //@ts-ignore
  // const submitHandler = (ev) => {
  //   ev.preventDefault()

  //   setStartEmailValidation(true)
  //   setStartPasswordValidation(true)

  //   if (isEmailValid && isPasswordValid && !serverErrorMessage) {
  //     setIsLoading(true)
  //     signInWithEmailAndPassword(auth, emailInput, passwordInput)
  //       .then((user) => { })
  //       .catch((error) => {
  //         const errorCode = error.code
  //         console.log(errorCode)

  //         if (errorCode === 'auth/user-not-found') {
  //           setServerErrorMessage('Account doesn\'t exist.')
  //         } else if (errorCode === 'auth/wrong-password') {
  //           setServerErrorMessage('Invalid password.')
  //         } else {
  //           setServerErrorMessage('Something went wrong.')
  //         }
  //       })
  //       .finally(() => {
  //         setIsLoading(false)
  //       })
  //   }
  // }

  // const signInAsGuestHandler = () => {
  //   setIsGuestLoading(true)
  //   signInWithEmailAndPassword(auth, 'lovelyguest@fakemail.com', 'lovelyguest')
  //     .then((user) => { })
  //     .catch((error) => {
  //       const errorCode = error.code
  //       console.log(errorCode)

  //       if (errorCode === 'auth/user-not-found') {
  //         setServerErrorMessage('Account doesn\'t exist.')
  //       } else if (errorCode === 'auth/wrong-password') {
  //         setServerErrorMessage('Invalid password.')
  //       } else {
  //         setServerErrorMessage('Something went wrong.')
  //       }
  //     })
  //     .finally(() => {
  //       setIsGuestLoading(false)
  //     })
  // }

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <MainNav>
        <Link href="/">Home</Link> / <span>Sign In</span>
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
            <SignInOrganism />
          </FormProvider>
        )}
      </Div>
    </>
  )
}

export default SignIn
