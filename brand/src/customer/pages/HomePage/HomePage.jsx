import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import MainCarousel from "../../components/HomeCarousel/MainCarosel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { findProducts } from "../../../State/Product/Action";
import { getUser } from "../../../State/Auth/Action";
import AuthModal from "../../Auth/AuthModal"; // Ensure this component exists

const HomePage = () => {
  const jwt = localStorage.getItem("jwt");
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const { auth } = useSelector((store) => store);
  const [loading, setLoading] = useState(true);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // Track if login or register
  const location = useLocation();

  const handleOpen = (mode) => {
    setAuthMode(mode); // Set login or register
    setOpenAuthModal(true);
  };

  const handleClose = useCallback(() => {
    setOpenAuthModal(false);
  }, []);

  // Extract query parameters
  const category = searchParams.get("category") || "";
  const colors = searchParams.getAll("color");
  const sizes = searchParams.getAll("size");
  const minPrice = searchParams.get("minPrice") || 0;
  const maxPrice = searchParams.get("maxPrice") || 10000;
  const discount = searchParams.get("discount") || 0;
  const sort = searchParams.get("sort") || "price-low";
  const pageNumber = parseInt(searchParams.get("page")) || 1;
  const stock = searchParams.get("stock") || "";

  const isFirstRender = useRef(true);
  
  useEffect(() => {
    const data = {
      category,
      colors,
      sizes,
      minPrice,
      maxPrice,
      minDiscount: discount,
      sort,
      pageNumber: pageNumber - 1,
      pageSize: 10,
      stock,
    };

    if (isFirstRender.current) {
      isFirstRender.current = false;
      dispatch(findProducts(data))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [
    dispatch,
    category,
    colors,
    sizes,
    minPrice,
    maxPrice,
    discount,
    sort,
    pageNumber,
    stock,
  ]);

  // Function to filter products by category
  const filteredData = (categoryName, titleName) =>
    products?.products?.content?.filter(
      (item) =>
        item?.category?.name?.toLowerCase().includes(categoryName.toLowerCase()) ||
        item?.title?.toLowerCase().includes(titleName.toLowerCase())
    ) || [];

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);

  useEffect(() => {
    if (auth.user) {
      handleClose();
    }
  }, [auth.user, handleClose]);

  return (
    <div>
      <MainCarousel />
      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
        {auth.user?.firstName ? (
          loading ? (
            <div className="flex justify-center items-center h-64 text-xl font-semibold">
              Loading<span className="animate-pulse">...</span>
            </div>
          ) : (
            <>
              <HomeSectionCarousel
                Data={filteredData("men", "men") || []}
                sectionName={"Men's"}
              />
              <HomeSectionCarousel
                Data={filteredData("women", "women") || []}
                sectionName={"Women's"}
              />
              <HomeSectionCarousel
                Data={filteredData("kurta", "kurta") || []}
                sectionName={"Kurta's"}
              />
              <HomeSectionCarousel
                Data={filteredData("other", "latest") || []}
                sectionName={"Latest"}
              />
              <HomeSectionCarousel
                Data={products?.products?.content || []} // Ensuring it's always an array
                sectionName={"All Products"}
              />
            </>
          )
        ) : (
          <section className="relative bg-white py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="max-w-4xl text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Discover Comfort & Style
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Elevate your wardrobe with our premium collection of T-shirts.
                Sign in now and explore exclusive deals, trending styles, and
                personalized recommendations.
              </p>
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-100"
                  onClick={() => handleOpen("login")}
                >
                  Sign In
                </button>
                <button
                  className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800"
                  onClick={() => handleOpen("register")}
                >
                  Create Account
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
      {/* Auth Modal Component */}
      <AuthModal handleClose={handleClose} open={openAuthModal} />
    </div>
  );
};

export default HomePage;
