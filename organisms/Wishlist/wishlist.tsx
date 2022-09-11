import { FC } from 'react'
import { WishlistItemCard } from '@Molecules'

import { Props } from './type'

const Wishlist: FC<Props> = ({
  setImageToBeNotified,
  clothes,
}) => {
  return (
    <>
      <div className="title">
        Wishlist <span>({clothes.length} items)</span>
      </div>
      <div className="clothes">
        {clothes.map((clothe) => (
          <WishlistItemCard
            key={clothe.id}
            clothe={clothe}
            setImage={setImageToBeNotified}
          />
        ))}
      </div>
    </>
  )
}

export default Wishlist
