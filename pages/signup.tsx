import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
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
  //@ts-ignore
  const user = useSelector((state) => state.auth.user)
  const [serverErrorMessage, setServerErrorMessage] = useState('')

  const useFormMethods = useForm<Types.SignUpFormData>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    mode: 'onTouched',
  })

  if (user) {
    router.replace('/collections')
  }

  //@ts-ignore
  const submitHandler = async (formData: Types.SignUpFormData) => {
    const { email, password, name } = formData
    console.log('v1 ==>', { email, password, name })
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid
        console.log('v1 userCredential ==>', { userCredential })
        console.log('v1 uid ==>', { uid })
        setDoc(doc(db, uid, 'account'), {
          name,
          email,
        })
          .then(() => {
            setDoc(doc(db, uid, 'wishlist'), {
              items: [],
            }).then(() => {
              setDoc(doc(db, uid, 'cart'), {
                items: [],
              })
            })
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        const errorCode = error.code

        if (errorCode === 'auth/email-already-in-use') {
          setServerErrorMessage('Email address already in use.')
        } else {
          setServerErrorMessage('Something went wrong.')
        }
      })
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
