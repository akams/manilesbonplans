/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, FC } from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'

import { useQueryClient } from 'react-query'

import { db } from '@FirebaseConfig/firebase'
import { getFormattedCurrency } from '@Utils/getFormattedCurrency'
import {
  BetterLink,
  Modal,
  SizePickerForBottoms,
  SizePickerForTops,
} from '@Atoms'
import { CloseIcon } from '@Assets/icons'

import { useUpdateWishlistMutation } from '@Services/wishlist'
import { getSizeAvailable } from '@Utils/size'

import { Div, ModalDiv } from './styledComponent'
import { Props } from './type'

const WishlistItemCard: FC<Props> = ({
  product,
  setImage,
  refetchWishlist,
}) => {
  const queryClient = useQueryClient()
  const {
    id,
    size,
    imageURL,
    brand,
    name,
    amount,
    currency,
    type,
    itemSize,
  } = product
  const { mutateAsync: wishlistRequestMutation } = useUpdateWishlistMutation(queryClient)

  const removeWishListRequest = async (itemId: string) => {
    await wishlistRequestMutation({
      productId: itemId
    })
  }

  const sizeBottomToDisplay: string[] = ['shoes']

  const [pickedSize, setPickedSize] = useState('')
  const [showSizePicker, setShowSizePicker] = useState(false)
  const [promptSize, setPromptSize] = useState(false)
  const user = useSelector((state) => state.auth.user)
  const cartItems = useSelector((state) => state.cart.items)
  const cartItem = cartItems.find(
    (item) => item.itemId === id && item.itemSize === size,
  )
  const cartItemIndex = cartItems.findIndex(
    (item) => item.itemId === id && item.itemSize === size,
  )
  const isInCart = !!cartItem

  const sizeListAvaiblable = getSizeAvailable(size)

  const openSizePickerHandler = () => {
    setShowSizePicker(true)
  }

  const closeSizePickerHandler = () => {
    setPickedSize('')
    setShowSizePicker(false)
    setPromptSize(false)
  }

  const deleteItemHandler = async () => {
    try {
      await removeWishListRequest(id)
    } catch (error) {
      console.log(error)
    }
  }

  const removeItemHandler = async () => {
    try {
      await removeWishListRequest(id)
      setImage(imageURL)
      closeSizePickerHandler()
      refetchWishlist()
    } catch (error) {
      console.log(error)
    }
  }

  const moveToCartHandler = async (fromModal = false) => {

    if (itemSize) {
      console.log('enter here ==>size')
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
          removeItemHandler()
        } catch (error) {
          console.log(error)
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
          removeItemHandler()
        } catch (error) {
          console.log(error)
        }
      }
    } else if (pickedSize) {
      const cartItem = cartItems.find(
        (item) => item.itemId === id && item.itemSize === pickedSize,
      )
      const cartItemIndex = cartItems.findIndex(
        (item) => item.itemId === id && item.itemSize === pickedSize,
      )
      const isInCart = !!cartItem

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
          removeItemHandler()
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const updatedItem = {
            itemId: id,
            itemSize: pickedSize,
            itemQuantity: '1',
          }
          await updateDoc(doc(db, user.uid, 'cart'), {
            items: arrayUnion(updatedItem),
          })
          removeItemHandler()
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      if (fromModal) {
        setPromptSize(true)
      } else {
        openSizePickerHandler()
      }
    }
  }

  return (
    <>
      <Div>
        <div className="item">
          <button className="delete" onClick={deleteItemHandler}>
            <CloseIcon />
          </button>
          <BetterLink href={`/collections/${id}`}>
            <Image
              src={imageURL}
              width={220}
              height={275}
              layout="responsive"
              alt={name}
              priority
            />
          </BetterLink>
          <div className="info">
            <div className="brand">{brand}</div>
            <div className="name">{name}</div>
            <div className="amount">{`${getFormattedCurrency(
              Number(amount),
            )} ${currency}`}</div>
          </div>
        </div>
        <button className="cart" onClick={() => moveToCartHandler()}>
          Move to Cart
        </button>
      </Div>
      {showSizePicker && (
        <Modal closeHandler={closeSizePickerHandler}>
          <ModalDiv>
            <div className="title">Select size</div>
            {promptSize && <div className="error">Please select a size</div>}
            <div className="sizes">
              {sizeBottomToDisplay.includes(type) ? (
                <SizePickerForBottoms
                  currentSize={pickedSize}
                  onSetSize={setPickedSize}
                  sizeListAvaiblable={sizeListAvaiblable}
                />
              ) : (
                <SizePickerForTops
                  currentSize={pickedSize}
                  onSetSize={setPickedSize}
                />
              )}
            </div>
            <button
              className="done"
              onClick={() => moveToCartHandler(true)}
            >
              Done
            </button>
          </ModalDiv>
        </Modal>
      )}
    </>
  )
}

export default WishlistItemCard
