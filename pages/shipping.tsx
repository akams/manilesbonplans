/* eslint-disable @typescript-eslint/no-explicit-any */
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

import * as Types from '@Types'

import { requestPostFinishOrder } from '@Services/api'

const getDefaultValue = (user: Types.User) => {
  return {
    deliveryAddressName: '' || user?.deliveryAddress?.name,
    deliveryAddressStreet: '' || user?.deliveryAddress?.street,
    deliveryAddressCity: '' || user?.deliveryAddress?.city,
    deliveryAddressCountry: 'GABON',
    deliveryAddressZipCode: '' || user?.deliveryAddress?.zipCode,
    deliveryAddressTel: '' || user?.deliveryAddress?.tel,
  }
}

const Shipping: NextPage = () => {
  const router = useRouter()
  const user = useSelector<Types.SelectorTypes>(({ auth }) => auth.user) as Types.User

  const useFormMethods = useForm({
    defaultValues: getDefaultValue(user),
    mode: 'onTouched',
  })

  if (!user) {
    router.replace('/signin')
  }

  const submitHandlerForm = async (formData: any) => {
    await requestPostFinishOrder(formData)
  }

  return (
    <>
      <Head>
        <title>Shipping</title>
      </Head>
      <MainNav>
        <Link href="/">Home</Link> / <span>Shipping</span>
      </MainNav>
      <Div>
        <ShippingContextProvider>
          <FormProvider {...useFormMethods}>
            <ShippingOrganism
              submitHandlerForm={submitHandlerForm}
            />
          </FormProvider>
        </ShippingContextProvider>
      </Div>
    </>
  )
}

export default Shipping