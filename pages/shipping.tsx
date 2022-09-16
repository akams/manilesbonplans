/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { db } from '@FirebaseConfig/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { MainNav } from '@Atoms'
import { ShippingOrganism } from '@Organisms'
import { ShippingContextProvider } from '@Organisms/Shipping'
import { Div } from '@Organisms/SignUp/styledComponent'

import * as Types from '@Types'

const Shipping: NextPage = () => {
  const router = useRouter()

  const user = useSelector<Types.SelectorTypes>(({ auth }) => auth.user) as Types.User

  const useFormMethods = useForm({
    defaultValues: {
      deliveryAddressName: '',
      deliveryAddressStreet: '',
      deliveryAddressCity: '',
      deliveryAddressCountry: 'GABON',
      deliveryAddressZipCode: '',
      deliveryAddressTel: '',
    },
    mode: 'onTouched',
  })

  if (!user) {
    router.replace('/signin')
  }

  const submitHandlerForm = async (formData: any) => {
    const { uid } = user
    const deliveryAddress = {
      ...formData,
    }
    await updateDoc(doc(db, uid, 'cart'), {
      items: [],
    })
    await updateDoc(doc(db, user.uid, 'account'), {
      deliveryAddress
    })
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