/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useSelector } from 'react-redux'

import { deleteDoublonProducts } from '@Utils/getItems'

import { MainNav } from '@Atoms'
import { ProductsOrganism } from '@Organisms'
import { Div } from '@Organisms/Products/styledComponent'

import { useGetListShoes, useGetShoesCategories, useGetShoesBrands } from '@Services/shoes'


const ProductShoes = () => {
  const [products, setProducts] = useState([])
  const [lastVisibleItem, setLastVisible] = useState<any>()
  const [hasMore, setHasMore] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  let dataProduct: any[]
  let last: string
  //@ts-ignore
  const {
    brands: selectorBrands,
    category: selectorCategory,
  } = useSelector((state) => state.filter)

  const { data: dataShoesCategories = [] } = useGetShoesCategories({
    enabled: true,
    cacheTime: 5000,
    retry: false,
  })

  const { data: dataShoesBrands = [] } = useGetShoesBrands({
    enabled: true,
    cacheTime: 5000,
    retry: false,
  })

  const { data, refetch } = useGetListShoes({ filteredBrands: selectedBrands, last: lastVisibleItem, category: selectedCategory }, {
    enabled: true,
    cacheTime: 500,
    retry: false,
  })

  if (data) {
    //@ts-ignore
    dataProduct = data?.productShoes
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
        const brandsWithoutAll = selectorBrands.filter((brand: string) => brand !== 'ALL')
        if (brandsWithoutAll.length > 0) {
          if (dataProduct.length === 1) setHasMore(false)
          return dataProduct
        }
        //@ts-ignore
        return deleteDoublonProducts(oldData.concat(dataProduct))
      })
    }
    //@ts-ignore
  }, [dataProduct, selectorBrands, selectorCategory, last, setProducts]);

  // selected brands
  useEffect(() => {
    if (selectorBrands) {
      setSelectedBrands(`${selectorBrands.join("&")}`)
    }
  }, [selectorBrands]);

  // selected category
  useEffect(() => {
    if (selectorCategory) {
      setSelectedCategory(selectorCategory)
    }
  }, [selectorCategory]);

  return (
    <>
      <Head>
        <title>Collections</title>
      </Head>
      <MainNav>
        <Link href="/">Home</Link> / <Link href="/collections">Collections</Link> / <span>Chaussures</span>
      </MainNav>
      <Div>
        <ProductsOrganism
          products={products}
          hasMore={hasMore}
          brands={dataShoesBrands}
          categories={dataShoesCategories}
          fetchMoreData={fetchMoreData}
          subLink="shoes"
        />
      </Div>
    </>
  )
}

export default ProductShoes
