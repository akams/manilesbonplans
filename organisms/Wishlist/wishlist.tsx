import { FC } from 'react'
import { WishlistItemCard } from '@Molecules'

import { Props } from './type'

const Wishlist: FC<Props> = ({
  refetchWishlist,
  setImageToBeNotified,
  products,
}) => {
  return (
    <>
      <div className="title">
        Wishlist <span>({products.length} items)</span>
      </div>
      <div className="clothes">
        {products.map((product) => (
          <WishlistItemCard
            key={product.id}
            product={product}
            refetchWishlist={refetchWishlist}
            setImage={setImageToBeNotified}
          />
        ))}
      </div>
    </>
  )
}

export default Wishlist
