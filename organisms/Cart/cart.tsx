import uniqid from 'uniqid'
import { CartItemCard } from '@Molecules'

const Cart = ({
  isPlacingOrder,
  placeOrderHandler,
  clothes,
}) => {

  const priceValue = clothes.reduce(
    //@ts-ignore
    (prev, cur) => prev + +cur.amount * +(Number(cur.itemQuantity)),
    0,
  )
  // const discountValue = Math.floor(priceValue / 5)
  const totalValue = priceValue
  return (
    <>
      <div className="cart">
        <div className="title">
          Cart <span>({clothes.length} items)</span>
        </div>
        <div className="clothes">
          {clothes.map((item, index) => (
            //@ts-ignore
            <CartItemCard key={uniqid()} index={index} {...item} />
          ))}
        </div>
      </div>
      <div className="checkout">
        <div className="title">Price details</div>
        <div className="basic">
          <div className="price">
            <div className="title">Price</div>
            <div className="amount">{priceValue} €</div>
          </div>
          {/* <div className="discount">
            <div className="title">Discount</div>
            <div className="amount">- Rs. {discountValue}</div>
          </div> */}
          <div className="shipping">
            <div className="title">Shipping</div>
            <div className="amount">FREE</div>
          </div>
        </div>
        <div className="total">
          <div className="final">
            <div className="title">Total Amount</div>
            <div className="amount">{totalValue} €</div>
          </div>
          <button
            className="order"
            onClick={placeOrderHandler}
            disabled={isPlacingOrder}
          >
            {isPlacingOrder ? (
              <span className="loader"></span>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart
