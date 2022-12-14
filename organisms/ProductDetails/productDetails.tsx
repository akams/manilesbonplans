import { FC } from 'react'
import Image from 'next/image'
import {
  SizePickerForTops,
  SizePickerForBottoms,
} from '@Atoms'

import { Spinner } from '@Atoms/Loading'
import { getFormattedCurrency } from '@Utils/getFormattedCurrency'
import { getSizeAvailable } from '@Utils/size'

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
  typeProduct,
}) => {
  const {
    id,
    imageURL,
    brand,
    name,
    amount,
    currency,
    size: sizeProduct,
  } = product

  const sizeBottomToDisplay: string[] = ['shoes']
  const sizeTopToDisplay: string[] = []

  //@ts-ignore
  const isWishlisted = !!wishlistItems.find((value) => value.itemId === id)

  const sizeListAvaiblable = getSizeAvailable(sizeProduct)

  if (!id) return <Spinner />

  return (
    <div className="card">
      <div className="image">
        <Image
          loading="lazy"
          src={imageURL}
          width={330}
          height={412}
          layout="responsive"
          alt={`${name}-${brand}`}
        />
      </div>
      <div className="info">
        <div className="brand">{brand}</div>
        <div className="name">{name}</div>
        <div className="amount">{`${getFormattedCurrency(
          Number(amount),
        )} ${currency}`}</div>
        <div className="size-box">
          {sizeTopToDisplay.includes(typeProduct) && <div className="head">
            <div className="title">Select Size</div>
            <div className="chart" onClick={openSizeChartHandler}>
              Size Chart
            </div>
          </div>}
          {promptSize && <div className="error">Please select a size</div>}
          <div className="sizes">
            {sizeBottomToDisplay.includes(typeProduct) ? (
              <SizePickerForBottoms
                sizeListAvaiblable={sizeListAvaiblable}
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
