import { api } from "../../config/apiConfig";
import {
    CREATE_PRODUCT_FAILURE,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    FIND_PRODUCT_BY_ID_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
    FIND_PRODUCTS_FAILURE,
    FIND_PRODUCTS_REQUEST,
    FIND_PRODUCTS_SUCCESS
} from "./Actiontype";

// Action to fetch products with pagination and filters
export const findProducts = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCTS_REQUEST });

    const {
        colors = '',
        sizes = '',
        minPrice = 0,
        maxPrice = 10000,
        minDiscount = 0,
        category = '',
        stock = '',
        sort = 'price-low',
        pageNumber = 1,
        pageSize = 10
    } = reqData;

    try {
        const { data } = await api.get(`/api/products`, {
            params: {
                color: colors,
                size: sizes,
                minPrice,
                maxPrice,
                minDiscount,
                category,
                stock,
                sort,
                pageNumber,
                pageSize
            }
        });

        console.log("Fetched products data: ", data);
        dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        console.error("Error fetching products: ", error);
        dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
    }
};

// Action to fetch product by ID
export const findProductsById = (productId) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

    try {
        const { data } = await api.get(`/api/products/id/${productId}`);
        console.log("DATA IS: ",data);
        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        console.error("Error fetching product by ID: ", error);
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
    }
};

// Action to create a new product
export const createProduct = (productData) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    try {
        const { data } = await api.post(`/api/admin/products/`, productData);
        console.log("Created product: ", data);
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        console.error("Error creating product: ", error);
        dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
    }
};

// Action to delete a product by ID
export const deleteProduct = (productId) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    try {
        await api.delete(`/api/admin/products/${productId}`);
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: { _id: productId } });
    } catch (error) {
        console.error("Error deleting product: ", error);
        dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
    }
};
