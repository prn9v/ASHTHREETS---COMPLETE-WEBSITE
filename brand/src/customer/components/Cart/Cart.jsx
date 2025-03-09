import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { get } from '../../../State/Cart/Action'


const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cart} = useSelector(store=>store);
  const handleCheckOut = () => {
      navigate(`/checkout?step=2`)
  }

  useEffect(()=>{
    dispatch(get())
  },[cart.deleteCartItem,cart.updateCartItem])
  return (
    <div>
      <div className='lg:grid grid-cols-3 mt-24 lg:px-16 relative'>
        <div className='col-span-2 space-y-2'>
          {cart.cart?.cartItems?.map((item) => (
            <CartItem item={item}/>
          ))}
        </div>
        <div className=' border px-8 py-8 ml-8 self-start min-h-40'>
          <p className='uppercase font-bold opacity-60 text-center'>Price Details</p>
          <hr />
          <div className='space-y-3 font-semibold mb-10'>
            <div className='flex justify-between pt-3 text-black'>
              <span>Price</span>
              <span>₹{cart.cart?.totalPrice}</span>
            </div>
            <div className='flex justify-between pt-3 text-black'>
              <span>Discount</span>
              <span className='text-green-600'>-₹{(cart.cart?.totalPrice)-(cart.cart?.totalDiscountedPrice)}</span>
            </div>
            <div className='flex justify-between pt-3 text-black'>
              <span>Delivery Charges</span>
              <span className='text-green-600'>Free</span>
            </div>
            <div className='flex justify-between pt-3 text-black'>
              <span>Total Amount</span>
              <span className='text-green-600'>₹{cart.cart?.totalDiscountedPrice}</span>
            </div>
          </div>
          <Button 
            onClick={handleCheckOut}
            variant="contained" 
            className="w-full text-xl font-semibold" 
            sx={{
              px: "2rem",
              py: "1rem",
              bgcolor: "green",
              color: "white",
              '&:hover': {
                bgcolor: "darkgreen",
              }
            }}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Cart
