import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import InfiniteScroll from "react-infinite-scroll-component";
import {
  EmptyResults,
  BrandFilter,
  ItemCard,
  SortSelect,
  SmallSort,
  SmallFilter,
  Loading,
  CategoryFilter,
} from '@Atoms'
//@ts-ignore
const Products = ({ products, brands, categories, hasMore, fetchMoreData }) => {
  const [width, setWidth] = useState(window.innerWidth)
  //@ts-ignore
  const filteredSort = useSelector((state) => state.filter.sort)

  let filteredProducts = [...products]

  if (filteredSort === 'price_high_to_low') {
    filteredProducts = filteredProducts.sort((a, b) => +b.amount - +a.amount)
  } else if (filteredSort === 'price_low_to_high') {
    filteredProducts = filteredProducts.sort((a, b) => +a.amount - +b.amount)
  }

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return (
    <>
      {width > 640 && (
        <aside className="aside">
          <div className="title">Filters</div>
          <CategoryFilter items={categories} />
          <BrandFilter items={brands} />
        </aside>
      )}
      <main className="main">
        <div className="top">
          <div className="title">Collections</div>
          {width > 640 ? (
            <SortSelect />
          ) : (
            <div className="sort-filter">
              <SmallSort />
              <SmallFilter brandItems={brands} categoryItems={categories} />
            </div>
          )}
        </div>
        {<InfiniteScroll
          dataLength={filteredProducts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={hasMore ? <Loading /> : ''}
          endMessage={<p style={{ textAlign: "center" }}></p>}
        >
          {filteredProducts.length > 0 ? (
            <div className="clothes">
              {filteredProducts.map((item, index) => (
                <ItemCard key={item.id} {...item} setPriority={index < 8} />
              ))}
            </div>
          ) : (
            <EmptyResults />
          )}
        </InfiniteScroll>}
      </main>
    </>
  )
}

export default Products
