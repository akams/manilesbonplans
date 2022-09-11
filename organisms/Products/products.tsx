import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  EmptyResults,
  BrandFilter,
  CategoryFilter,
  ItemCard,
  SortSelect,
  SmallSort,
  SmallFilter,
} from '@Atoms'

//@ts-ignore
const Products = ({ clothes, brands, categories }) => {
  const [width, setWidth] = useState(window.innerWidth)
  //@ts-ignore
  const filteredBrands = useSelector((state) => state.filter.brands)
  //@ts-ignore
  const filteredCategories = useSelector((state) => state.filter.categories)
  //@ts-ignore
  const filteredSort = useSelector((state) => state.filter.sort)

  let filteredClothes

  filteredClothes
    = filteredBrands.length > 0
      ? [...clothes].filter((value) => filteredBrands.includes(value.brand))
      : [...clothes]

  filteredClothes
    = filteredCategories.length > 0
      ? filteredClothes.filter((value) =>
        filteredCategories.includes(value.category),
      )
      : filteredClothes

  if (filteredSort === 'price_high_to_low') {
    filteredClothes = filteredClothes.sort((a, b) => +b.amount - +a.amount)
  } else if (filteredSort === 'price_low_to_high') {
    filteredClothes = filteredClothes.sort((a, b) => +a.amount - +b.amount)
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
          <BrandFilter items={brands} />
          <CategoryFilter items={categories} />
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
        {filteredClothes.length > 0 ? (
          <div className="clothes">
            {filteredClothes.map((item, index) => (
              <ItemCard key={item.id} {...item} setPriority={index < 8} />
            ))}
          </div>
        ) : (
          <EmptyResults />
        )}
      </main>
    </>
  )
}

export default Products
