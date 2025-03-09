import { Button, Card, CardContent, Typography } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'

const TrignleImg = styled("img")({
    right:0,
    bottom:0,
    height:170,
    position:"absolute",
})

const TrophyImg = styled("img")({
    right:36,
    bottom: 26,
    height:98,
    position: "absolute",
})

const Acheivement = () => {
  return (
    <Card sx={{position: "relative",bgcolor:"#636e72",color:"white"}}>
        <CardContent>
            <Typography variant='h6' sx={{letterSpacing:".25px"}}>
                ASHREETS
            </Typography>
            <Typography variant='body2'>Congraluation</Typography>
            <Typography variant='h5' sx={{my:3.1}}>420k</Typography>
            <Button size='small' variant='contained'>
                View Sales
            </Button>
            <TrignleImg src=''></TrignleImg>
            <TrophyImg src='https://tse1.mm.bing.net/th?id=OIP.QTYWJcxE3wf4GmIOrHZkaAHaJk&pid=Api' className=' mix-blend-normal'></TrophyImg>
        </CardContent>
    </Card>
  )
}

export default Acheivement
