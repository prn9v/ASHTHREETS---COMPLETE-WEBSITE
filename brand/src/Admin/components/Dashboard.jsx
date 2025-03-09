import { Grid } from '@mui/material'
import React from 'react'
import Acheivement from './Acheivement'
import MonthlyOverview from './MonthlyOverview'
import RecentOrderView from '../View/RecentOrderView'
import RecentProductsView from '../View/RecentProductsView'

const Dashboard = () => {
  return (
    <div className='p-10'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <div className=' shadow-lg shadow-gray-600'>
            <Acheivement/>
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
        <div className=' shadow-lg shadow-gray-600'>
          <MonthlyOverview/>
        </div>
        </Grid>
        <Grid item xs={10} md={6}>
        <div className=' shadow-lg shadow-gray-600'>
          <RecentOrderView/>
        </div>
        </Grid>
        <Grid item xs={10} md={6}>
        <div className=' shadow-lg shadow-gray-600'>
          <RecentProductsView/>
        </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
