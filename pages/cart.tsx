import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Head from 'next/head'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'

import {
  MainNav,
  EmptyCart,
  SignInPromptTemplate,
} from '@Atoms'
import { Div } from '@Organisms/Cart'

import getItemById from '@Utils/getItemById'
import { db } from '@FirebaseConfig/firebase'

import { OrderPlaced } from '@Molecules'
import { CartOrganism } from '@Organisms'


const Cart = () => {
  const [clothes, setClothes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)
  //@ts-ignore
  const user = useSelector((state) => state.auth.user)
  //@ts-ignore
  const cartItems = useSelector((state) => state.cart.items)

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
    setIsPlacingOrder(true)
    try {
      await addDoc(collection(db, 'orders'), {
        items: cartItems,
        totalPrice: totalValue,
      })
      setIsOrderPlaced(true)
      updateDoc(doc(db, user.uid, 'cart'), {
        items: [],
      })
      console.log('cart.js // 190')
      setIsPlacingOrder(false)
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
      {isOrderPlaced ? (
        <OrderPlaced />
      ) : (
        !isLoading
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
        ))
      )}
    </>
  )
}

export default Cart
