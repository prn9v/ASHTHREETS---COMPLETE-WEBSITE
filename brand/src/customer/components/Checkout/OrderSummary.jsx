import React, { useEffect } from 'react';
import AddressCard from '../AddressCard/AddressCard';
import { Button, CircularProgress } from '@mui/material';
import CartItem from '../Cart/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getOrderById } from '../../../State/Order/Action';

const PriceDetails = ({ totalPrice = 0, discount = 0, totalDiscountedPrice = 0 }) => (
  <div className='border px-8 py-8 ml-8 self-start min-h-40'>
    <p className='uppercase font-bold opacity-60 text-center'>Price Details</p>
    <hr />
    <div className='space-y-3 font-semibold mb-10'>
      <div className='flex justify-between pt-3 text-black'>
        <span>Price</span>
        <span>₹{totalPrice}</span>
      </div>
      <div className='flex justify-between pt-3 text-black'>
        <span>Discount</span>
        <span className='text-green-600'>₹{discount}</span>
      </div>
      <div className='flex justify-between pt-3 text-black'>
        <span>Delivery Charges</span>
        <span className='text-green-600'>Free</span>
      </div>
      <div className='flex justify-between pt-3 text-black'>
        <span>Total Amount</span>
        <span className='text-green-600'>₹{totalDiscountedPrice}</span>
      </div>
    </div>
  </div>
);

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { order, loading, error } = useSelector(store => store.order); // Adjust based on Redux slice

  // Extract orderId from query parameters
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    if (orderId) {
      console.log("Fetching order:", orderId);
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]); // Runs when orderId changes

  // Loading and error states
  if (loading) {
    return <CircularProgress className="m-auto" />;
  }

  if (error) {
    return <p className="text-red-500">Error fetching order: {error}</p>;
  }

  const { orderItems, shippingAddress, totalPrice, discount, totalDiscountedPrice } = order || {};

  return (
    <div className='p-8'>
      {/* Shipping Address Section */}
      <div className='p-8 shadow-lg rounded-md border'>
        {shippingAddress ? (
          <AddressCard address={shippingAddress} />
        ) : (
          <p>No shipping address available.</p>
        )}
      </div>

      {/* Order Items and Price Details */}
      <div className='lg:grid grid-cols-3 mt-10 lg:px-16 relative'>
        <div className='col-span-2 space-y-2'>
          {orderItems && orderItems.length > 0 ? (
            orderItems.map(item => (
              <CartItem key={item._id || item.productId} item={item} />
            ))
          ) : (
            <p>No items in the order.</p>
          )}
        </div>

        <PriceDetails
          totalPrice={totalPrice}
          discount={discount}
          totalDiscountedPrice={totalDiscountedPrice}
        />
      </div>

      {/* Place Order Button */}
      <Button
        variant="contained"
        className="w-full text-xl font-semibold mt-4"
        sx={{
          px: '2rem',
          py: '1rem',
          bgcolor: 'green',
          color: 'white',
          '&:hover': {
            bgcolor: 'darkgreen',
          },
        }}
      >
        Make Payment
      </Button>
    </div>
  );
};

export default OrderSummary;
