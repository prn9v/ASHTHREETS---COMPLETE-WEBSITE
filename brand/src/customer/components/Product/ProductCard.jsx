import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="ProductCard w-[15rem] m-3 transition-all cursor-pointer"
    >
      <div className="h-[20rem]">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="object-cover object-top w-full h-full"
        />
      </div>

      <div className="textpart bg-white p-3">
        <div>
          <p className="font-bold opacity-60">{product.brand}</p>
          <p>{product.title}</p>
        </div>
        <div className="flex items-start space-x-2">
          <div className="font-semibold">₹{product.discountedPrice}</div>
          {product.discountPresent && (
            <>
              <div className="line-through opacity-50">{product.price}</div>
              <div className="text-green-600">{product.discount}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
