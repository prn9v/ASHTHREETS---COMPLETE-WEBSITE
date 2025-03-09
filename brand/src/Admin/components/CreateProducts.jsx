import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../State/Product/Action';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const initialSizes = [
  { name: "S", quantity: 0},
  { name: "M", quantity: 0},
  { name: "L", quantity: 0},
];

const CreateProducts = () => {

  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    size: initialSizes,
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
  });
  
  const dispatch = useDispatch();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSizeChange = useCallback((e, index) => {
    const { name, value } = e.target;
    const updatedSizes = [...productData.size];
    updatedSizes[index] = {
      ...updatedSizes[index],
      [name === 'size_quantity' ? 'quantity' : name]: value,
    };
    setProductData((prevState) => ({
      ...prevState,
      size: updatedSizes,
    }));
  }, [productData.size]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));  // Pass productData directly
    navigate('/admin');
};

  return (
    <div className="createProductContainer p-10">
      <Typography variant='h3' sx={{ textAlign: "center" }} className='py-10 text-center'>
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit} className='createProductContainer min-h-screen'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="IMAGEURL" name='imageUrl' value={productData.imageUrl} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="BRAND" name='brand' value={productData.brand} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="TITLE" name='title' value={productData.title} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="COLOR" name='color' value={productData.color} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="QUANTITY" name='quantity' value={productData.quantity} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Price" name='price' value={productData.price} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Discounted Price" name='discountedPrice' value={productData.discountedPrice} onChange={handleChange} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select name="topLevelCategory" value={productData.topLevelCategory} onChange={handleChange} label="Top Level Category">
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="kids">Kids</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select name="secondLevelCategory" value={productData.secondLevelCategory} onChange={handleChange} label="Second Level Category">
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="brands">Brands</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Third Level Category</InputLabel>
              <Select name="thirdLevelCategory" value={productData.thirdLevelCategory} onChange={handleChange} label="Third Level Category">
                <MenuItem value="top">Tops</MenuItem>
                <MenuItem value="women_dress">Women Dress</MenuItem>
                <MenuItem value="t-shirts">T-shirts</MenuItem>
                <MenuItem value="saree">Saree</MenuItem>
                <MenuItem value="mens_kurta">Mens Kurta</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth id="outlined-multiline-static" label="Description" multiline name="description" rows={3} onChange={handleChange} value={productData.description} />
          </Grid>
          {productData.size.map((size, index) => (
            <Grid container item spacing={3} key={index}>
              <Grid item xs={12} sm={6}>
                <TextField label="Size Name" name="name" value={size.name} onChange={(event) => handleSizeChange(event, index)} required fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Quantity" name='size_quantity' type='number' onChange={(event) => handleSizeChange(event, index)} fullWidth />
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12} className='items-center text-center'>
            <Button variant='contained' sx={{ p: 1.8 }} className='py-20' size='large' type='submit'>Add New Product</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateProducts;
