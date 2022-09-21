/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

import { useSelector } from 'react-redux'
import { MainNav } from '@Atoms'
import { ProductsOrganism } from '@Organisms'
import { Div } from '@Organisms/Products/styledComponent'

import { collection, query, orderBy, limit, getDocs, startAfter } from 'firebase/firestore'
import { db } from '@FirebaseConfig/firebase'

import getItems from '@Utils/getItems'
import * as Types from '@Types'


const Products = () => {
  const productsPerPage = 15
  const [products, setProducts] = useState([])
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [lastVisibleItem, setLastVisible] = useState<any>()
  const [hasMore, setHasMore] = useState(false)


  const fetchProducts = async (last?: any) => {
    let q1
    if (!last) {
      console.log('first render', last)
      q1 = query(collection(db, "products"),
        orderBy("id"),
        limit(productsPerPage));
    } else {
      console.log('second render avec last', last)
      q1 = query(collection(db, "products"),
        orderBy("id"),
        startAfter(last),
        limit(productsPerPage));
    }

    const docSnap = await getDocs(q1)

    const tmpProducts: any = []
    docSnap.forEach((doc) => tmpProducts.push(doc.data()))
    const updatedProducts = tmpProducts.map(({ imgSrc, type, price, ...prod }: any) => {
      const [directory, filename] = imgSrc.split('/')
      const templateString = `/${directory}%2F${filename}`
      // price
      const [currency, amount] = price.split(' ')
      return {
        ...prod,
        amount,
        currency,
        category: type,
        imageURL: `https://firebasestorage.googleapis.com/v0/b/manilesbonsplans-22c99.appspot.com/o${templateString}?alt=media`,
      }
    })

    if (updatedProducts.length > 0) {
      console.log('continue', { updatedProducts })
      setProducts(products.concat(updatedProducts))
      setHasMore(true)
    } else {
      console.log('empty', { updatedProducts })
      // empty
      setHasMore(false)
      return;
    }

    const brandsMap = tmpProducts.reduce((previous: string[], { brand }: Types.ClothesProduct) => {
      if (!previous.includes(brand)) {
        previous.push(brand)
      }
      return previous
    }, [])
    const brandsWithoutDoubon = brands.concat(brandsMap).reduce((previous: string[], value: string) => {
      if (!previous.includes(value)) {
        previous.push(value)
      }
      return previous
    }, [])
    //@ts-ignore
    setBrands(brandsWithoutDoubon)

    const categoriesMap = tmpProducts.reduce((previous: string[], { type }: any) => {
      if (!previous.includes(type)) {
        previous.push(type)
      }
      return previous
    }, [])
    const categoriesWithoutDoubon = categories.concat(categoriesMap).reduce((previous: string[], value: string) => {
      if (!previous.includes(value)) {
        previous.push(value)
      }
      return previous
    }, [])
    console.log('categoriesWithoutDoubon', categoriesWithoutDoubon)
    //@ts-ignore
    setCategories(categoriesWithoutDoubon);

    const lastVisible = docSnap.docs[docSnap.docs.length - 1];
    console.log('save last', { lastVisible })
    setLastVisible(lastVisible)
  }

  const fetchMoreData = async () => {
    console.log('exec in fetchMoreData', lastVisibleItem)
    await fetchProducts(lastVisibleItem)
  }

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetchProducts()
      // ...
    }
    fetchData();
  }, []);


  return (
    <>
      <Head>
        <title>Collections</title>
      </Head>
      <MainNav>
        <Link href="/">Home</Link> / <span>Collections</span>
      </MainNav>
      <Div>
        {products.length !== 0 &&
          brands.length !== 0 &&
          categories.length !== 0 && (<ProductsOrganism
            clothes={products}
            brands={brands}
            categories={categories}
            hasMore={hasMore}
            fetchMoreData={fetchMoreData}
          />)}
      </Div>
    </>
  )
}

export default Products
