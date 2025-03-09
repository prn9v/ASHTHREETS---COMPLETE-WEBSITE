"use client";

import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { Grid, Rating } from "@mui/material";
import { Button } from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import { Box } from "@mui/system";
import { mens_kurta } from "../../../Data/mens/Kurta/kurta";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../../../State/Product/Action";
import { addItemToCART } from "../../../State/Cart/Action";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState("");

  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const product = products.product; // Assuming this is where the product data is stored

  const handleAddToCart = () => {
    if (!product) {
      return alert("Product not available");
    }
    if (!selectedSize || !selectedSize.name) {
      return alert("Please select a size"); // Ensure the size has a name
    }
    if (selectedSize.quantity === 0) {
      return alert("Selected size is out of stock");
    }

    const data = {
      productId,
      size: selectedSize.name, // Pass the selected size's name
    };

    dispatch(addItemToCART(data));
    navigate(`/cart`);
  };

  useEffect(() => {
    if (productId) {
      dispatch(findProductsById(productId));
    }
  }, [dispatch, productId]);

  if (!product) {
    // Handle loading state
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs?.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                alt={product.images?.[0]?.alt}
                src={product.imageUrl} // Assuming this is the correct image URL field
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
              {product.images?.map((item) => (
                <div
                  key={item.alt}
                  className="overflow-hidden rounded-lg max-w-[5rem] max-h-[rem] mt-4"
                >
                  <img
                    alt={item.alt}
                    src={item.src}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 max-h-auto max-w-2xl px-4 pb-16 sm:p-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                {product.brand || "Brand Name"}
              </h1>
              <h1 className="text-lg lg:text-xl text-gray-900 opacity-60">
                {product.description || "Product description"}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product Information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                <p className="font-semibold"> ₹{product.price}</p>
                {product.discount && (
                  <>
                    <p className="line-through opacity-50">
                      {" "}
                      ₹{product.originalPrice}
                    </p>
                    <p className="text-green-600 font-semibold">
                      {product.discount}% off
                    </p>
                  </>
                )}
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating
                    name="read-only"
                    value={product.rating || 0}
                    readOnly
                  />
                  <p className="opacity-50 text-sm">
                    {product.reviewsCount} Rating
                  </p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {product.reviewsCount} reviews
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {product.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size} // Pass the entire size object
                          disabled={size.quantity === 0} // Properly handle out of stock
                          className={classNames(
                            size.quantity !== 0
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                          )}
                        >
                          <span>{size.name}</span>
                          {size.quantity !== 0 ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                <div className="mt-5">
                  <Button
                    onClick={handleAddToCart}
                    variant="contained"
                    sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd" }}
                  >
                    Add To Cart
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Recommended products */}
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2 className="font-bold text-xl lg:text-2xl text-center mt-10">
                Recommended for you
              </h2>
            </Grid>
            {products.products?.content  && products?.products?.content.map((item) => (
              <Grid item xs={12} md={4} lg={3} key={item._id}>
                <HomeSectionCard product={item} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Reviews Section */}
        {/* <ProductReviewCard /> */}
      </div>
    </div>
  );
}
