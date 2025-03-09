import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { deepPurple } from '@mui/material/colors'
import StarBorderIcon from '@mui/icons-material/StarBorder';

const OrderDetails = () => {
  return (
    <div className='min-h-screen px-5 lg:px-20 '>
      <div className=' border p-10 pl-16'>
        <h1 className=' font-bold text-xl '>Delivery Address: </h1>
        <br />
        <AddressCard/>
      </div>

      <div className='py-20'>
            <OrderTracker activeStep={3}/>
      </div>

      <Grid container className=' space-y-5'>
        
        {[1,1,1,1].map((item)=><Grid item container className=' shadow-xl rounded-md p-5 border' sx={{alignItems: "center", justifyContent: "space-between"}}>
          <Grid item xs={6}>
            <div className=' flex items-center space-x-4'>
              <img src="https://tse2.mm.bing.net/th?id=OIP.unwrbDNSRfzuPYDkcxdK3AHaKQ&pid=Api&P=0&h=180" alt="" />

              <div className='space-y-2 ml-5'>
                <p className=' font-semibold'>A vibrant printed kurta that adds a pop of color to your wardrobe.</p>
                <p className=' space-x-5 opacity-50 text-xs font-semibold'><span>Color: Black</span><span>Size: M</span></p>
                <p>Brand: Wills Lifestyle</p>
                <p>₹1799</p>
              </div>
            </div>
          </Grid>

          <Grid item>
            <Box sx={{color: deepPurple[500]}}>
            <StarBorderIcon sx={{fontSize:"2rem"}} className='px-2'/>
            <span>Rate & Review Products</span>
            </Box>
          </Grid>
        </Grid>)}
      </Grid>
    </div>
  )
}

export default OrderDetails
