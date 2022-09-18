import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import type { NextPage } from 'next'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'

import { auth } from '@FirebaseConfig/firebase'
import { authActions } from '@Store/authSlice'

import { SignInOrganism } from '@Organisms'
import { Div } from '@Organisms/SignIn/styledComponent'
import { MainNav } from '@Atoms'

import * as Types from '@Types'

const SignIn: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector<Types.SelectorTypes>(({ auth }) => auth.user) as Types.User
  const [serverErrorMessage, setServerErrorMessage] = useState('')

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

  const submitHandler = async ({ email, password }: Types.SignInFormData) => {
    try {
      const currentUser = await signInWithEmailAndPassword(auth, email, password)
      if (currentUser) {
        dispatch(authActions.setUser({
          email: currentUser.user.email,
          uid: currentUser.user.uid,
          emailVerified: currentUser.user.emailVerified,
        }))

        router.replace('/collections')
      }
    } catch (error) {
      //@ts-ignore
      const errorCode = error.code
      if (errorCode === 'auth/user-not-found') {
        setServerErrorMessage('Account doesn\'t exist.')
      } else if (errorCode === 'auth/wrong-password') {
        setServerErrorMessage('Invalid password.')
      } else {
        setServerErrorMessage('Something went wrong.')
      }
    }
  }

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
              You are signed in as <span className="bold">{user?.email}</span>.
              You ll now be redirected.
            </p>
          </>
        ) : (
          <FormProvider {...useFormMethods}>
            <SignInOrganism
              serverErrorMessage={serverErrorMessage}
              submitHandler={submitHandler}
            />
          </FormProvider>
        )}
      </Div>
    </>
  )
}

export default SignIn
