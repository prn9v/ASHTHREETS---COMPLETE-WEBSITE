import { TrendingUp } from '@mui/icons-material';
import React from 'react';
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';

const salesData = [
    {
        stats: '245K',
        title: "Sales",
        color: 'primary',
        icon: <TrendingUp sx={{fontSize:"1.75rem"}}/>
    },
    {
        stats: '10.5K',
        title: "Customers",
        color: 'success',
        icon: <AccountCircleIcon sx={{fontSize:"1.75rem"}}/>
    },
    {
        stats: '1.5K',
        title: "Products",
        color: 'warning',
        icon: <SettingsCellIcon sx={{fontSize:"1.75rem"}}/>
    },
    {
        stats: '15K',
        title: "Revenue",
        color: 'info',
        icon: <AttachMoneyIcon sx={{fontSize:"1.75rem"}}/>
    }
];

const renderStats = () => {
    return salesData.map((item, index) => (
        <Grid item xs={12} sm={3} key={index}>
            <Box sx={{display: "flex", alignItems: "center"}}>
                <Avatar variant='rounded' sx={{
                    mr: 3,
                    width: 44,
                    height: 44,
                    boxShadow: 3,
                    color: 'white',
                    backgroundColor: theme => theme.palette[item.color].main
                }}>
                    {item.icon}
                </Avatar>

                <Box sx={{display: "flex", flexDirection: 'column'}}>
                    <Typography variant='caption'>{item.title}</Typography>
                    <Typography variant='h6'>{item.stats}</Typography>
                </Box>
            </Box>
        </Grid>
    ));
}

const MonthlyOverview = () => {
  return (
    <div>
      <Card sx={{bgcolor:"#636e72",color:"white"}}>
        <CardHeader
          title="Monthly Overview"
          action={
            <IconButton size='small'><MoreVertIcon/></IconButton>
          }
          subheader={
            <Typography variant='body2'>
              <Box component="span" sx={{fontWeight: 600, color: 'text.primary'}}>
                Total 48.5% growth
              </Box>
            </Typography>
          }
          titleTypographyProps={{
            sx:{
                mb: 2.5,
                lineHeight: '2rem !important',
                letterSpacing: '.15px !important'
            }
          }}
        />
        <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
          <Grid container spacing={[5, 0]}>
            {renderStats()}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default MonthlyOverview;
