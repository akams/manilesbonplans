/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useSelector } from 'react-redux'

import { deleteDoublonProducts } from '@Utils/getItems'

import { MainNav } from '@Atoms'
import { ProductsOrganism } from '@Organisms'
import { Div } from '@Organisms/Products/styledComponent'


import { useGetBrands, useGetProducts } from '@Services/products'


const Products = () => {
  const [products, setProducts] = useState([])
  const [lastVisibleItem, setLastVisible] = useState<any>()
  const [hasMore, setHasMore] = useState(true)
  const [selectedBrands, setSelectedBrands] = useState('')
  //@ts-ignore
  const filteredBrands = useSelector((state) => state.filter.brands)

  const { data: dataBrands = [] } = useGetBrands({
    enabled: true,
    cacheTime: 5000,
    retry: false,
  })

  let dataProduct: any[]
  let last: string

  const { data, refetch } = useGetProducts({ filteredBrands: selectedBrands, last: lastVisibleItem }, {
    enabled: true,
    cacheTime: 500,
    retry: false,
  })

  if (data) {
    //@ts-ignore
    dataProduct = data?.products
    //@ts-ignore
    last = data?.last
  }

  const fetchMoreData = async () => {
    //@ts-ignore
    setLastVisible(() => {
      if (last) {
        return last
      }
      setHasMore(false)
      return;
    })
    refetch()
  }

  useEffect(() => {
    if (dataProduct) {
      setHasMore(true)
      //@ts-ignore
      setProducts((oldData) => {
        const brandsWithoutAll = filteredBrands.filter((brand: string) => brand !== 'ALL')
        if (brandsWithoutAll.length > 0) {
          if (dataProduct.length === 1) setHasMore(false)
          return dataProduct
        }
        //@ts-ignore
        return deleteDoublonProducts(oldData.concat(dataProduct))
      })
    }
    //@ts-ignore
  }, [dataProduct, filteredBrands, last, setProducts]);

  // selected brands
  useEffect(() => {
    if (filteredBrands) {
      setSelectedBrands(`${filteredBrands.join("&")}`)
    }
  }, [filteredBrands]);

  return (
    <>
      <Head>
        <title>Collections</title>
      </Head>
      <MainNav>
        <Link href="/">Home</Link> / <span>Collections</span>
      </MainNav>
      <Div>
        {products.length !== 0 && (
          <ProductsOrganism
            products={products}
            brands={dataBrands}
            hasMore={hasMore}
            fetchMoreData={fetchMoreData}
          />
        )}
      </Div>
    </>
  )
}

export default Products
