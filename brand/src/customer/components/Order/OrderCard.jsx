import { Grid, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../../../State/Product/Action";
import { api } from "../../../config/apiConfig";
import "./OrderCard.css";

const OrderCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`/api/order_items/get/${item}`);
        setOrderData(response.data);
        dispatch(findProductsById(response.data.product));
      } catch (err) {
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [item, dispatch]);

  const product = useSelector((state) => state.products.product);

  if (loading) {
    return (
      <div className="OrderCard p-5 border shadow-md cursor-pointer flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="OrderCard p-5 border shadow-md cursor-pointer">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const { deliveryDate, size, discountedPrice, _id } = orderData || {};
  const today = new Date();
  const deliveryDateObj = deliveryDate ? new Date(deliveryDate) : null;
  const isDelivered = deliveryDateObj && deliveryDateObj < today;

  return (
    <div onClick={() => navigate(`/account/order/${_id || item}`)} className="OrderCard p-5 border shadow-md cursor-pointer">
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div className="flex">
            <img 
              className="w-[5rem] h-[5rem] object-cover object-top" 
              src={product?.imageUrl } 
              alt={product?.brand || "Order Product"} 
            />
            <div className="ml-5 space-y-2">
              <p>{product?.title}</p>
              <p className="opacity-50 text-sm font-semibold">Size: {size || "N/A"}</p>
              <p className="opacity-50 text-sm font-semibold">Color: {product?.color || "N/A"}</p>
            </div>
          </div>
        </Grid>

        <Grid item xs={2}>
          <p>₹{discountedPrice || 0}</p>
        </Grid>

        <Grid item xs={4}>
          <div>
            <p>
              <AdjustIcon 
                sx={{ width: "15px", height: "15px" }} 
                className={isDelivered ? "text-green-600 mr-2 text-sm" : "text-orange-600 mr-2 text-sm"} 
              />
              {isDelivered 
                ? `Delivered On ${deliveryDateObj.toLocaleDateString()}`
                : `Order Will Arrive Soon ${deliveryDateObj ? `on ${deliveryDateObj.toLocaleDateString()}` : ""}`
              }
            </p>
            <p className="text-xs">
              {isDelivered ? "Your items have been delivered" : "Your items are on the way"}
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
