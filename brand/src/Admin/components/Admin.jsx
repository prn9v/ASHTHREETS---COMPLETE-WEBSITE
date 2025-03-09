import { CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Box, useMediaQuery, useTheme  } from '@mui/system';
import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import Dashboard from './Dashboard';
import CreateProducts from './CreateProducts';
import ProductsTable from './ProductsTable';
import OrdersTable from './OrdersTable';


const menu = [
    {name: "Dashboard", path: "/admin", icon: <DashboardIcon/>},
    {name: "Products", path: "/admin/products", icon: <ShoppingBagIcon/>},
    {name: "Orders", path: "/admin/orders", icon: <ShoppingCartIcon/>},
    {name: "AddProduct", path: "/admin/product/create", icon: <AddIcon/>},
]

const Admin = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const navigate = useNavigate();

    const drawer = (
        <Box sx={{ overflow: "auto", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%"}}>

            {/* {isLargeScreen && <Toolbar/>} */}
            <List>
                {menu.map((item) => (
                    <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)}>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText>
                                {item.name}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText>
                                Account
                            </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            
        </Box>
    )

    return (
        <div>
            <div className=' relative flex h-[100vh]'>
                <CssBaseline/>
                <div className='w-[15rem] border-r-gray-500 h-full fixed top-0 '>
                    {drawer}
                </div>
                <div className='w-[85%] h-full ml-[15%]'>
                    <Routes>
                        <Route path='/' element={<Dashboard/>}></Route>
                        <Route path='/product/create' element={<CreateProducts/>}></Route>
                        <Route path='/products' element={<ProductsTable/>}></Route>
                        <Route path='/orders' element={<OrdersTable/>}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Admin
