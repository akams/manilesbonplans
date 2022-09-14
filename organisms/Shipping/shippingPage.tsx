/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { MainNav } from '@Atoms'
import { ShippingOrganism } from '@Organisms'
import { ShippingContextProvider } from '@Organisms/Shipping'
import { Div } from '@Organisms/SignUp/styledComponent'

const Shipping: NextPage = () => {
  const router = useRouter()
  //@ts-ignore
  const user = useSelector((state) => state.auth.user)

  const useFormMethods = useForm({
    defaultValues: {
      deliveryAddress: {
        name: '',
        street: '',
        city: '',
        country: 'GABON',
        zipCode: '',
        tel: '',
      },
      billingAddress: {
        name: '',
        street: '',
        city: '',
        country: '',
        zipCode: '',
        tel: '',
      },
      isSame: true,
    },
    mode: 'onTouched',
  })

  const {
    getValues,
  } = useFormMethods

  const { deliveryAddress, billingAddress, isSame } = getValues()

  if (!user) {
    router.replace('/signin')
  }

  const submitHandler = async () => console.log('submitHandler')

  return (
    <>
      <Head>
        <title>Shipping</title>
      </Head>
      <MainNav>
        <Link href="/">Home</Link> / <span>Shipping</span>
      </MainNav>
      <Div>
        <ShippingContextProvider
          deliveryAddress={deliveryAddress}
          billingAddress={billingAddress}
          isSame={isSame}
        >
          <FormProvider {...useFormMethods}>
            <ShippingOrganism
              submitHandler={submitHandler}
            />
          </FormProvider>
        </ShippingContextProvider>
      </Div>
    </>
  )
}

export default Shipping