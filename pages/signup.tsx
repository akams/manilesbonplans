import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { sendEmailVerification } from 'firebase/auth'
import { auth } from '@FirebaseConfig/firebase'

import { useSelector } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import axios from 'axios'

import { MainNav } from '@Atoms'
import { SignUpOrganism } from '@Organisms'
import { Div } from '@Organisms/SignUp/styledComponent'

import * as Types from '@Types'
import * as ApiTypes from '@Types/api'

const requestSignUp = (payload: ApiTypes.ApiSignupType) => axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT_API}/signup`, payload);

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

  const submitHandler = async ({ email, password, name }: Types.SignUpFormData) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      const { uid } = user
      sendEmailVerification(user)
      await requestSignUp({
        uid,
        name,
        email,
      })
      return router.replace('/signup-confirmation')
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
