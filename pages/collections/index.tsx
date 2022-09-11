import Link from 'next/link'
import Head from 'next/head'
import type { NextPage } from 'next'

import { MainNav } from '@Atoms'
import { ProductsOrganism } from '@Organisms'
import { Div } from '@Organisms/Products/styledComponent'

import getItems from '@Utils/getItems'
import * as Types from '@Types'

//@ts-ignore
const Products: NextPage = ({ clothes, brands, categories }: Types.ProductsViewProps) => {

  return (
    <>
      <Head>
        <title>Collections</title>
      </Head>
      <MainNav>
        <Link href="/">Home</Link> / <span>Collections</span>
      </MainNav>
      <Div>
        <ProductsOrganism
          clothes={clothes}
          brands={brands}
          categories={categories}
        />
      </Div>
    </>
  )
}

//@ts-ignore
export const getStaticProps = () => {
  const items = getItems()

  const brands = items.reduce((previous: String[], { brand }: Types.ClothesProduct) => {
    if (!previous.includes(brand)) {
      previous.push(brand)
    }
    return previous
  }, [])

  const categories = items.reduce((previous: String[], { category }: Types.ClothesProduct) => {
    if (!previous.includes(category)) {
      previous.push(category)
    }
    return previous
  }, [])

  return {
    props: {
      clothes: items,
      brands,
      categories,
    },
  }
}

export default Products
