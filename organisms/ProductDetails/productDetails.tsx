import { FC } from 'react'
import Image from 'next/image'
import {
  SizePickerForTops,
  SizePickerForBottoms,
} from '@Atoms'
import { getFormattedCurrency } from '@Utils/getFormattedCurrency'

import { Props } from './type'

//@ts-ignore
const ProductDetails: FC<Props> = ({
  product,
  openSizeChartHandler,
  size,
  setSize,
  promptSize,
  isLoading,
  addToWishlistHandler,
  addToCartHandler,
  wishlistItems,
}) => {
  const {
    id,
    imageURL,
    brand,
    category,
    name,
    amount,
  } = product

  //@ts-ignore
  const isWishlisted = !!wishlistItems.find((value) => value.itemId === id)

  return (
    <div className="card">
      <div className="image">
        <Image
          src={imageURL}
          width={330}
          height={412}
          layout="responsive"
          alt="img"
        />
      </div>
      <div className="info">
        <div className="brand">{brand}</div>
        <div className="name">{name}</div>
        <div className="amount">{`Rs. ${getFormattedCurrency(
          Number(amount),
        )}`}</div>
        <div className="size-box">
          <div className="head">
            <div className="title">Select Size</div>
            <div className="chart" onClick={openSizeChartHandler}>
              Size Chart
            </div>
          </div>
          {promptSize && <div className="error">Please select a size</div>}
          <div className="sizes">
            {category === 'Jeans' ? (
              <SizePickerForBottoms
                currentSize={size}
                onSetSize={setSize}
              />
            ) : (
              <SizePickerForTops currentSize={size} onSetSize={setSize} />
            )}
          </div>
        </div>
        <div className="actions">
          <button
            className="wishlist"
            onClick={addToWishlistHandler}
            disabled={isWishlisted}
          >
            {isWishlisted ? 'Wishlisted' : 'Wishlist'}
          </button>
          <button
            className="cart"
            onClick={addToCartHandler}
            disabled={isLoading}
          >
            {isLoading ? <span className="loader"></span> : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
