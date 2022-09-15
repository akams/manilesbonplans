import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useSelector } from 'react-redux'

import {
  MainNav,
  Notification,
  EmptyWishlist,
  SignInPromptTemplate,
} from '@Atoms'
import { WishlistOrganism } from '@Organisms'
import { Div } from '@Organisms/Wishlist'

import getItemById from '@Utils/getItemById'

import * as Types from '@Types'

const Wishlist = () => {
  const [clothes, setClothes] = useState([])
  const [activateNotification, setActivateNotification] = useState(false)
  const [imageToBeNotified, setImageToBeNotified] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  //@ts-ignore
  const user = useSelector((state) => state.auth.user)
  //@ts-ignore
  const wishlistItems = useSelector((state) => state.wishlist.items)

  useEffect(() => {
    const items = wishlistItems.map((item: Types.Wishlist) => {
      const itemDetails = getItemById(item.itemId)
      return { size: item.itemSize, ...itemDetails }
    })

    setClothes(() => {
      setIsLoading(false)
      return items
    })
  }, [wishlistItems])

  useEffect(() => {
    if (imageToBeNotified) {
      setActivateNotification(true)
      setTimeout(() => {
        setActivateNotification(false)
      }, 3000)
    }
  }, [imageToBeNotified])

  return (
    <>
      <Head>
        <title>Wishlist</title>
      </Head>
      <MainNav>
        <Link href="/">Home</Link> / <span>Wishlist</span>
      </MainNav>
      {!isLoading
        && (user ? (
          clothes.length > 0 ? (
            <Div>
              <WishlistOrganism
                clothes={clothes}
                setImageToBeNotified={setImageToBeNotified}
              />
            </Div>
          ) : (
            <EmptyWishlist />
          )
        ) : (
          <SignInPromptTemplate type="wishlist" />
        ))}
      <Notification
        className={`notification ${activateNotification ? 'activate' : ''}`}
      >
        {imageToBeNotified && (
          <Image
            src={imageToBeNotified}
            width={33}
            height={41}
            layout="fixed"
            alt="img"
            priority
          />
        )}
        <p>Item added to cart successfully</p>
      </Notification>
    </>
  )
}

export default Wishlist
