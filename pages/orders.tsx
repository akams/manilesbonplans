import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { MainNav } from '@Atoms'
import { OrdersOrganism } from '@Organisms'
import { Div } from '@Organisms/Orders'

import getItemById from '@Utils/getItemById'
import * as Types from '@Types'

import { useGetOrder } from '@Services/orders'

const Orders = () => {
  const router = useRouter()
  const [orders, setOrders] = useState<Types.Product[]>([])
  const user = useSelector<Types.SelectorTypes>(({ auth }) => auth.user) as Types.User

  if (!user) {
    router.replace('/signin')
  }

  const { data } = useGetOrder({
    enabled: true,
    cacheTime: 500,
    retry: true,
  })

  useEffect(() => {
    if (data) {
      const ordersItems = data.map(({ items, totalPrice, status, date }) => {
        const subgroupItem = items.map((item) => {
          const itemDetails = getItemById(item?.itemId)
          return {
            size: item?.itemSize,
            quantity: item?.itemQuantity,
            ...itemDetails,
          }
        })
        return {
          subgroupItem,
          totalPrice,
          status,
          date
        }

      })

      // @ts-ignore
      setOrders(() => {
        return ordersItems
      })
    }
  }, [data])


  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <MainNav>
        <Link href="/">Home</Link> / <span>Mes commandes</span>
      </MainNav>
      <Div>
        <OrdersOrganism orders={orders} />
      </Div>
    </>
  )
}

export default Orders
