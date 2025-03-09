import { Button, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./CartItem.css";
import { useDispatch } from "react-redux";
import { removeItemToCART, updateItemToCART } from "../../../State/Cart/Action";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleUpdateCartItem = (num) => {
    // Update the quantity by adding `num` to the current quantity
    const updatedQuantity = item?.quantity + num;

    // Create the data object with the new quantity and the CartItemId
    const data = {
      data: { quantity: updatedQuantity },
      CartItemId: item._id, // Ensure CartItemId is passed correctly
    };

    // Dispatch the update action
    dispatch(updateItemToCART(data));
  };

  const handleRemoveCartItem = () => {
    dispatch(removeItemToCART(item._id));
  };

  return (
    <div className="CartItem p-5 shadow-lg rounded-md border ">
      <div className="flex items-center">
        {/* Ensure item has imageUrl, or show placeholder */}
        <div className="h-[5rem] w-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="h-full w-full object-cover object-top"
            src={item?.product?.imageUrl || "https://via.placeholder.com/150"}
            alt={item?.product?.brand || "Cart Product"}
          />
        </div>

        <div className="ml-4 space-y-1">
          {/* Ensure item has title */}
          <p className="font-semibold">
            {item?.product?.brand || "Unknown Product"}
          </p>
          {/* Ensure item has size */}
          <p className="opacity-70">
            Size: {item?.size || "N/A"}, {item?.product?.color}
          </p>

          <div className="flex space-x-3 items-center text-gray-900 pt-6">
            {/* Ensure item has price and discountedPrice */}
            <p className="font-semibold">
              ₹{item?.product?.discountedPrice || 0}
            </p>
            <p className="opacity-50 line-through">
              ₹{item?.product?.price || 0}
            </p>
            <p className="text-green-600 font-semibold">
              {Math.round(
                ((item?.product?.price - item?.product?.discountedPrice) /
                  item?.product?.price) *
                  100
              ) || 0}
              % off
            </p>
          </div>
        </div>
      </div>

      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton
            onClick={() => handleUpdateCartItem(-1)}
            disabled={item?.quantity <= 1}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="py-1 px-7 rounded-sm">{item?.quantity || 1}</span>
          <IconButton
            onClick={() => handleUpdateCartItem(1)}
            sx={{ color: "RGB(145 85 253)" }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>

        <div>
          <Button
            onClick={handleRemoveCartItem}
            sx={{ color: "RGB(145 85 253)" }}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
