import { useState, FC } from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

import { db } from '@FirebaseConfig/firebase'
import { getFormattedCurrency } from '@Utils/getFormattedCurrency'
import {
  BetterLink,
  Modal,
  SizePickerForBottoms,
  SizePickerForTops,
} from '@Atoms'
import { CloseIcon } from '@Assets/icons'

import { Div, ModalDiv } from './styledComponent'
import { Props } from './type'

const WishlistItemCard: FC<Props> = ({
  clothe,
  setImage,
}) => {
  const {
    id,
    size,
    imageURL,
    brand,
    name,
    amount,
    category,
  } = clothe

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
      await updateDoc(doc(db, user.uid, 'wishlist'), {
        items: arrayRemove({ itemId: id, itemSize: size }),
      })
    } catch (error) {
      console.log(error)
    }
  }

  const removeItemHandler = async () => {
    try {
      await updateDoc(doc(db, user.uid, 'wishlist'), {
        items: arrayRemove({ itemId: id, itemSize: size }),
      })
      setImage(imageURL)
    } catch (error) {
      console.log(error)
    }
  }

  const moveToCartHandler = async (fromModal = false) => {
    if (size) {
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
          await updateDoc(doc(db, user.uid, 'cart'), {
            items: arrayUnion({
              itemId: id,
              itemSize: pickedSize,
              itemQuantity: '1',
            }),
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
            />
          </BetterLink>
          <div className="info">
            <div className="brand">{brand}</div>
            <div className="name">{name}</div>
            <div className="amount">{`Rs. ${getFormattedCurrency(
              Number(amount),
            )}`}</div>
          </div>
        </div>
        <button className="cart" onClick={() => moveToCartHandler}>
          Move to Cart
        </button>
      </Div>
      {showSizePicker && (
        <Modal closeHandler={closeSizePickerHandler}>
          <ModalDiv>
            <div className="title">Select size</div>
            {promptSize && <div className="error">Please select a size</div>}
            <div className="sizes">
              {category === 'Jeans' ? (
                <SizePickerForBottoms
                  currentSize={pickedSize}
                  onSetSize={setPickedSize}
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
