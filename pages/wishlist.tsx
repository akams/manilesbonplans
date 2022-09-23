import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import {
  Loading,
  MainNav,
  Notification,
  EmptyWishlist,
} from '@Atoms'
import { WishlistOrganism } from '@Organisms'
import { Div } from '@Organisms/Wishlist'

import { useGetWishlistProducts } from '@Services/wishlist'

const Wishlist = () => {
  const [products, setProducts] = useState([])
  const {
    data,
    isSuccess,
    refetch,
  } = useGetWishlistProducts()

  const [activateNotification, setActivateNotification] = useState(false)
  const [imageToBeNotified, setImageToBeNotified] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (data) {
      //@ts-ignore
      setProducts(data)
      setIsLoading(isSuccess)
    }
  }, [data, isSuccess])

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
        ? (<Loading />)
        : products.length > 0 ? (
          <Div>
            <WishlistOrganism
              //@ts-ignore
              products={products}
              refetchWishlist={refetch}
              setImageToBeNotified={setImageToBeNotified}
            />
          </Div>
        ) : (
          <EmptyWishlist />
        )
      }
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
