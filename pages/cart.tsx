import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'

import {
  MainNav,
  EmptyCart,
  SignInPromptTemplate,
} from '@Atoms'
import { Div } from '@Organisms/Cart'

import getItemById from '@Utils/getItemById'
import { db } from '@FirebaseConfig/firebase'

import { CartOrganism } from '@Organisms'

import * as Types from '@Types'


const Cart = () => {
  const router = useRouter()
  const [clothes, setClothes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [_, setIsOrderPlaced] = useState(false)

  const user = useSelector<Types.SelectorTypes>(({ auth }) => auth.user) as Types.User
  const cartItems = useSelector<Types.SelectorTypes>(({ cart }) => cart.items)

  useEffect(() => {
    //@ts-ignore
    const items = cartItems.map((item) => {
      const itemDetails = getItemById(item.itemId)
      return {
        size: item.itemSize,
        quantity: item.itemQuantity,
        ...itemDetails,
      }
    })

    setClothes(() => {
      setIsLoading(false)
      return items
    })
  }, [cartItems])

  const priceValue = clothes.reduce(
    //@ts-ignore
    (prev, cur) => prev + +cur.amount * +cur.quantity,
    0,
  )

  const discountValue = Math.floor(priceValue / 5)
  const totalValue = priceValue - discountValue

  const placeOrderHandler = async () => {
    const { name, uid } = user
    setIsPlacingOrder(true)
    try {
      await addDoc(collection(db, 'orders'), {
        items: cartItems,
        totalPrice: totalValue,
        userUid: uid,
        name,
      })
      setIsOrderPlaced(true)
      //wait shipping page
      // await updateDoc(doc(db, uid, 'cart'), {
      //   items: [],
      // })
      setIsPlacingOrder(false)
      router.replace('/shipping')
    } catch (error) {
      console.log('error', error)
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
