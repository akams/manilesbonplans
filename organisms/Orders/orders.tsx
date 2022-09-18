import uniqid from 'uniqid'
import { OrderItemCard } from '@Molecules/CartItemCard'


const TinyOrders = ({ orderItem }) => {
  return (
    <div>
      {orderItem.map((item, index) => (
        //@ts-ignore
        <OrderItemCard key={uniqid()} index={index} {...item} disabled />
      ))}
    </div>
  )
}

const Orders = ({
  orders,
}) => {
  return (
    <>
      <div style={{ width: '100%' }}>
        {orders.map((orderItem, indexGroup) => {
          const { subgroupItem, totalPrice } = orderItem
          return (
            <div className="cart" key={`${indexGroup}-${uniqid()}`}>
              <div className="checkout">
                <div className="title">Commande : {indexGroup + 1}</div>
                <div className="total">
                  <div className="final">
                    <div className="title">Total Amount</div>
                    <div className="amount">Rs. {totalPrice}</div>
                  </div>
                </div>
              </div>
              <TinyOrders orderItem={subgroupItem} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Orders
