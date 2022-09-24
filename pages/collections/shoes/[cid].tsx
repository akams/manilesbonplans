import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '@FirebaseConfig/firebase'

import {
  Loading,
  MainNav,
  Modal,
  SizeChartForTops,
  SizeChartForBottoms,
} from '@Atoms'
import { ModalDiv } from '@Atoms/Modal'
import { ProductDetailsOrganism } from '@Organisms'
import { Div } from '@Organisms/ProductDetails/styledComponent'

import { useGetShoes } from '@Services/shoes'

const ProductDetails = () => {
  const router = useRouter()
  const { cid } = router.query

  const { data, isSuccess } = useGetShoes({ id: cid }, {
    enabled: true,
    cacheTime: 5000,
    retry: false,
  })

  // const { id, brand, category, name } = product
  const [showSizeChart, setShowSizeChart] = useState(false)
  const [size, setSize] = useState('')
  const [promptSize, setPromptSize] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  //@ts-ignore
  const user = useSelector((state) => state.auth.user)
  //@ts-ignore
  const wishlistItems = useSelector((state) => state.wishlist.items)
  //@ts-ignore
  const cartItems = useSelector((state) => state.cart.items)

  const cartItem = cartItems.find(
    //@ts-ignore
    (item) => item.itemId === data?.id && item.itemSize === size,
  )
  const cartItemIndex = cartItems.findIndex(
    //@ts-ignore
    (item) => item.itemId === data?.id && item.itemSize === size,
  )
  const isInCart = !!cartItem

  const addToWishlistHandler = async () => {
    if (user) {
      try {
        await updateDoc(doc(db, user.uid, 'wishlist'), {
          items: arrayUnion({
            //@ts-ignore
            itemId: data?.id,
            itemSize: size || null,
            type: 'shoes'
          }),
        })
      } catch (error) {
        console.error(error)
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
            type: 'shoes',
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
            console.error(error)
          } finally {
            setIsLoading(false)
          }

        } else {
          try {
            await updateDoc(doc(db, user.uid, 'cart'), {
              items: arrayUnion({
                //@ts-ignore
                itemId: data?.id,
                itemSize: size,
                itemQuantity: '1',
                type: 'shoes'
              }),
            })
          } catch (error) {
            console.error(error)
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
        <Link href="/collections/shoes">Chaussures</Link>
        {' / '}
        <span>{` ${data?.brand} ${data?.name}`}</span>
      </MainNav>
      <Div>
        {isSuccess
          ? (
            <ProductDetailsOrganism
              //@ts-ignore
              product={data}
              openSizeChartHandler={openSizeChartHandler}
              size={size}
              setSize={setSize}
              promptSize={promptSize}
              isLoading={isLoading}
              addToWishlistHandler={addToWishlistHandler}
              addToCartHandler={addToCartHandler}
              wishlistItems={wishlistItems}
              typeProduct="shoes"
            />
          ) : <Loading />
        }
      </Div>
      {showSizeChart && (
        <Modal closeHandler={closeSizeChartHandler}>
          <ModalDiv>
            <div className="title">Size Chart</div>
            <div className="table">
              {data?.category === 'Jeans' ? (
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

export default ProductDetails
