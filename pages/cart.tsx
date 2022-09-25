import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { db } from '@FirebaseConfig/firebase'
import { doc, updateDoc } from 'firebase/firestore'

import {
  MainNav,
  EmptyCart,
  SignInPromptTemplate,
} from '@Atoms'
import { CartOrganism } from '@Organisms'
import { Div } from '@Organisms/Cart'

import * as Types from '@Types'

import { useGetCartlistProducts } from '@Services/cart'

const Cart = () => {
  const router = useRouter()
  const [clothes, setClothes] = useState<Types.Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const {
    data,
    isSuccess,
  } = useGetCartlistProducts()

  const user = useSelector<Types.SelectorTypes>(({ auth }) => auth.user) as Types.User

  useEffect(() => {
    if (isSuccess) {
      // @ts-ignore
      setClothes(() => {
        setIsLoading(false)
        return data
      })
    }
  }, [isSuccess, data])

  const priceValue = clothes.reduce(
    //@ts-ignore
    (prev, cur) => prev + +cur.amount * +cur.quantity,
    0,
  )

  const discountValue = Math.floor(priceValue / 5)
  const totalValue = priceValue - discountValue

  const placeOrderHandler = async () => {
    const { uid } = user
    setIsPlacingOrder(true)
    try {
      await updateDoc(doc(db, uid, 'draftOrder'), {
        items: data,
        totalPrice: totalValue,
      })
      setIsPlacingOrder(false)
      router.replace('/shipping')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <MainNav>
        <Link href="/">Home</Link> / <span>Cart</span>
      </MainNav>
      {!isLoading
        && (user ? (
          clothes.length > 0 ? (
            <Div>
              <CartOrganism
                isPlacingOrder={isPlacingOrder}
                placeOrderHandler={placeOrderHandler}
                clothes={clothes}
              />
            </Div>
          ) : (
            <EmptyCart />
          )
        ) : (
          <SignInPromptTemplate type="cart" />
        ))}
    </>
  )
}

export default Cart
