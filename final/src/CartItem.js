import React from 'react'
import { useGlobalContext } from './context'
const CartItem = ({ id, img, title, price, amount }) => {
  const { remove, increase, decrease, toggleAmount } = useGlobalContext()
  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
      </div>
      <div>
   
        {/* amount */}
        <p className='amount'>{amount}</p>
      </div>
    </article>
  )
}

export default CartItem
