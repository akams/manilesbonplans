/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useQueryClient, useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { collection, where, query, orderBy, limit, getDocs, startAfter } from 'firebase/firestore'
import { db } from '@FirebaseConfig/firebase'

import getItems from '@Utils/getItems'
import * as Types from '@Types'

import { MainNav } from '@Atoms'
import { ProductsOrganism } from '@Organisms'
import { Div } from '@Organisms/Products/styledComponent'

import apiClient from '@Utils/http-common';

import { useGetBrands, useGetProducts } from '@Services/products'

const getProducts = async (key: any, filteredBrands: any, lastVisibleItem: any) => {
  console.log('filteredBrands', filteredBrands)
  console.log('lastVisibleItem', lastVisibleItem)
  const { data } = await apiClient.get(`/products?categories=`)
  // const { data } = await apiClient.get(`/products?categories=${filteredBrands.join("&")}&last=${lastVisibleItem || ''}`)
  console.log('data?.products', data?.products)
  return {
    products: data?.products,
    last: data?.last
  }
}

const Products = () => {
  const queryClient = useQueryClient()
  const productsPerPage = 10
  const [products, setProducts] = useState([])
  const [brands, setBrands] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [lastVisibleItem, setLastVisible] = useState<any>()
  const [hasMore, setHasMore] = useState(true)
  //@ts-ignore
  const filteredBrands = useSelector((state) => state.filter.brands)
  const [retryProduct, setRetryProduct] = useState(false)
  const [filteredBrandSize, setFilteredBrandSize] = useState(0)

  const { data: dataBrands } = useGetBrands({
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


  //@ts-ignore
  // const { status: statusProducts, data: dataProducts } = useQuery(['products', 1, 2], getProducts)


  console.log('extract===>', dataProduct, last)
  /* 
  1er rendu 
  pas de categories /
  set products
  
  */
  const cleanFetchProductsByCategorie = async ({
    filter,
    last,
  }: any) => {
    let q1
    console.log('filter', filter)
    console.log('last', last)
    let queryLastBuilder: any = []
    if (last) {
      console.log('enter last', queryLastBuilder)
      queryLastBuilder = [startAfter(last)]
    }

    if (filter.length > 0) {
      if (last) {
        q1 = query(collection(db, "products"),
          orderBy("id"),
          limit(productsPerPage),
          startAfter(last),
          where("brand", "in", filter));
      } else {
        q1 = query(collection(db, "products"),
          orderBy("id"),
          limit(productsPerPage),
          where("brand", "in", filter));
      }
    } else {
      if (last) {
        q1 = query(collection(db, "products"),
          orderBy("id"),
          limit(productsPerPage),
          startAfter(last));
      } else {
        q1 = query(collection(db, "products"),
          orderBy("id"),
          ...queryLastBuilder,
          limit(productsPerPage));
      }
    }

    const docSnap = await getDocs(q1)
    const tmpData: any = []
    docSnap.forEach((doc) => tmpData.push(doc.data()))
    const listProducts = tmpData.map(({ imgSrc, type, price, ...prod }: any) => {
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
    // console.log('products', products.length)
    // console.log('maj listProducts', listProducts.length)

    const lastDocument = docSnap.docs[docSnap.docs.length - 1]

    setLastVisible(lastDocument)

    // const conditionnal = listProducts.length > 9 && lastDocument !== undefined
    if (listProducts.length > 0) {
      setHasMore(true)
      console.log('queryLastBuilder', queryLastBuilder.length)
      console.log('products', products.length)
      console.log('maj listProducts', listProducts.length)
      console.log('maj concat list', products.concat(listProducts))
      // if (queryLastBuilder.length !== 0) listProducts = products.concat(listProducts)
      // listProducts = [...products.concat(listProducts)].reduce((previous: any, prd: any) => {
      //   if (!previous.includes(prd.id)) {
      //     previous.push(prd);
      //   }
      //   return previous;
      // }, []);

      setProducts(products.concat(listProducts))
    } else {
      setHasMore(false)
      return;
    }
  }

  const productsCategoriesRequest = useCallback(async (last?: any) => {
    await cleanFetchProductsByCategorie({
      filter: filteredBrands,
      last,
    })
  }, [filteredBrands])


  const fetchProducts = async (last?: any) => {
    let q1
    let queryWhereBuilder: any = []
    if (filteredBrands.length > 0) {
      console.log('filteredBrands', filteredBrands)
      queryWhereBuilder = [where("brand", "in", filteredBrands)]
    }

    console.log('last', last, !last)
    console.log('size brand old, new', filteredBrands.length, filteredBrandSize)
    if (!last && filteredBrands.length !== filteredBrandSize) {
      console.log('pas de last', !last, last)
      q1 = query(collection(db, "products"),
        orderBy("id"),
        limit(productsPerPage),
        ...queryWhereBuilder);
    } else {
      console.log('à un last', !last, last)
      if (last) {
        q1 = query(collection(db, "products"),
          orderBy("id"),
          startAfter(last),
          limit(productsPerPage),
          ...queryWhereBuilder);
      } else {
        q1 = query(collection(db, "products"),
          orderBy("id"),
          limit(productsPerPage),
          ...queryWhereBuilder);
      }
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

    console.log('updatedProducts', updatedProducts.length)
    if (updatedProducts.length > 0) {
      setHasMore(true)
      console.log('queryWhereBuilder ', queryWhereBuilder.length)
      if (queryWhereBuilder.length !== 0) {
        console.log('==============queryWhereBuilder.length !== 0======================');
        console.log('products', products);
        console.log('updatedProducts', updatedProducts);
        let filteredProducts = products.concat(updatedProducts)
        filteredProducts = filteredProducts.filter(({ brand }) => filteredBrands.includes(brand))
        setProducts(filteredProducts)
      } else {
        console.log('==============queryWhereBuilder.length === 0======================');
        console.log('products', products);
        console.log('updatedProducts', updatedProducts);
        let filteredProducts = products.concat(updatedProducts)
        filteredProducts = filteredProducts.filter(({ brand }) => !filteredBrands.includes(brand))
        setProducts(filteredProducts)
      }
    } else {
      setHasMore(false)
      return;
    }

    const lastVisible = docSnap.docs[docSnap.docs.length - 1];
    setLastVisible(lastVisible)
    setFilteredBrandSize(filteredBrands.length)
  }

  const fetchMoreData = async () => {
    console.log('fetchMore my friend !')
    refetch()
    // await cleanFetchProductsByCategorie({
    //   filter: filteredBrands,
    // })
    // console.log(lastVisibleItem)
    // productsCategoriesRequest(lastVisibleItem)
  }

  // load products
  // useEffect(() => {
  //   async function fetchData() {
  //     await cleanFetchProductsByCategorie()
  //     // await fetchProducts()
  //   }
  //   if (filteredBrands) {
  //     fetchData();
  //   }
  // }, [filteredBrands]);

  // products
  // useEffect(() => {
  //   productsCategoriesRequest();
  // }, [productsCategoriesRequest]);


  // prod
  useEffect(() => {
    if (dataProduct) {
      //@ts-ignore
      // setProducts(products.concat(dataProduct?.products))
      setProducts((oldData) => {
        return [...oldData, ...dataProduct]
      })
      //@ts-ignore
      setLastVisible(last)
    }
    //@ts-ignore
  }, [dataProduct, last, setProducts]);

  // brands
  useEffect(() => {
    if (dataBrands) {
      //@ts-ignore
      setBrands(dataBrands)
    }
  }, [dataBrands]);

  // selected brands
  // useEffect(() => {
  //   if (filteredBrands) {
  //     //@ts-ignore
  //     setSelectedBrands(filteredBrands)
  //   }
  // }, [filteredBrands]);

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
            brands={brands}
            hasMore={hasMore}
            fetchMoreData={fetchMoreData}
          />
        )}
      </Div>
    </>
  )
}

export default Products
