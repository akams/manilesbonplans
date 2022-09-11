import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '@FirebaseConfig/firebase'

import {
  MainNav,
  Modal,
  SizeChartForTops,
  SizeChartForBottoms,
} from '@Atoms'
import { ModalDiv } from '@Atoms/Modal'
import { ProductDetailsOrganism } from '@Organisms'
import { Div } from '@Organisms/ProductDetails/styledComponent'

import getAllStaticPaths from '@Utils/getAllStaticPaths'
import getItemById from '@Utils/getItemById'

import * as Types from '@Types'

const ProductDetails = (product: Types.ClothesProduct) => {
  const { id, brand, category, name } = product
  const [showSizeChart, setShowSizeChart] = useState(false)
  const [size, setSize] = useState('')
  const [promptSize, setPromptSize] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  //@ts-ignore
  const user = useSelector((state) => state.auth.user)
  //@ts-ignore
  const wishlistItems = useSelector((state) => state.wishlist.items)
  //@ts-ignore
  const cartItems = useSelector((state) => state.cart.items)

  const cartItem = cartItems.find(
    //@ts-ignore
    (item) => item.itemId === id && item.itemSize === size,
  )
  const cartItemIndex = cartItems.findIndex(
    //@ts-ignore
    (item) => item.itemId === id && item.itemSize === size,
  )
  const isInCart = !!cartItem

  const addToWishlistHandler = async () => {
    if (user) {
      try {
        await updateDoc(doc(db, user.uid, 'wishlist'), {
          items: arrayUnion({
            itemId: id,
            itemSize: size || null,
          }),
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      router.push('/signin')
    }
  }

  const addToCartHandler = async () => {
    if (user) {
      if (size) {
        setPromptSize(false)
        setIsLoading(true)
        if (isInCart) {
          const updatedItem = {
            ...cartItem,
            itemQuantity: (+cartItem.itemQuantity + 1).toString(),
          }
          const updatedItems = [...cartItems]
          updatedItems.splice(cartItemIndex, 1, updatedItem)
          try {
            await updateDoc(doc(db, user.uid, 'cart'), {
              items: updatedItems,
            })
            // removeItemHandler()
          } catch (error) {
            console.log(error)
          } finally {
            setIsLoading(false)
          }

        } else {
          try {
            await updateDoc(doc(db, user.uid, 'cart'), {
              items: arrayUnion({
                itemId: id,
                itemSize: size,
                itemQuantity: '1',
              }),
            })
          } catch (error) {
            console.log(error)
          } finally {
            setIsLoading(false)
          }
        }
      } else {
        setPromptSize(true)
      }
    } else {
      router.push('/signin')
    }
  }

  const openSizeChartHandler = () => {
    setShowSizeChart(true)
  }

  const closeSizeChartHandler = () => {
    setShowSizeChart(false)
  }

  return (
    <>
      <MainNav>
        <Link href="/">Home</Link>
        {' / '}
        <Link href="/collections">Collections</Link>
        {' / '}
        <span>{` ${brand} ${name}`}</span>
      </MainNav>
      <Div>
        <ProductDetailsOrganism
          product={product}
          openSizeChartHandler={openSizeChartHandler}
          size={size}
          setSize={setSize}
          promptSize={promptSize}
          isLoading={isLoading}
          addToWishlistHandler={addToWishlistHandler}
          addToCartHandler={addToCartHandler}
          wishlistItems={wishlistItems}
        />
      </Div>
      {showSizeChart && (
        <Modal closeHandler={closeSizeChartHandler}>
          <ModalDiv>
            <div className="title">Size Chart</div>
            <div className="table">
              {category === 'Jeans' ? (
                <SizeChartForBottoms />
              ) : (
                <SizeChartForTops />
              )}
            </div>
          </ModalDiv>
        </Modal>
      )}
    </>
  )
}

export const getStaticPaths = () => {
  const paths = getAllStaticPaths()

  return {
    paths,
    fallback: true,
  }
}

//@ts-ignore
export const getStaticProps = (context) => {
  const cid = context.params.cid
  const item = getItemById(cid)

  return {
    props: {
      ...item,
    },
  }
}

export default ProductDetails
