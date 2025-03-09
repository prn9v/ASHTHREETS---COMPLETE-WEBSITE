
import { api } from "../../config/apiConfig";
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS,  GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, ORDER_HISTORY_REQUEST, ORDER_HISTORY_SUCCESS, ORDER_HISTORY_FAILURE } from "./Actiontype";

export const fetchOrderHistory = () => async (dispatch) => {
    dispatch({ type: ORDER_HISTORY_REQUEST }); // Dispatch request action
    try {
        console.log("Attempting to fetch order history...");
        const { data } = await api.get('/api/orders/user'); // Adjust endpoint path if needed
        console.log("Order History Fetched:", data);

        // Dispatch success action with payload
        dispatch({ type: ORDER_HISTORY_SUCCESS, payload: data });
    } catch (error) {
        console.error("Error fetching order history:", error.message);

        // Dispatch failure action with error message
        dispatch({
            type: ORDER_HISTORY_FAILURE,
            payload: error.response?.data?.error || "Failed to fetch order history",
        });
    }
};

export const fetchOrders = () => async (dispatch) => {
    dispatch({ type: GET_ORDERS_REQUEST });
    try {
        console.log("Attempting to fetch orders");
        const response = await api.get(`/api/orders/get`);
        console.log('Fetched Orders: ', response.data);
        dispatch({ type: GET_ORDERS_SUCCESS, payload: response.data }); // Dispatch success with the fetched orders
    } catch (error) {
        dispatch({ type: GET_ORDERS_FAILURE, payload: error.message || 'Failed to fetch orders' }); // Dispatch failure with error
    }
};

export const createOrder = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    console.log("Reqdata:", reqData);
    
    try {
        const { data } = await api.post(`/api/orders`, reqData);
        console.log("Created Order:", data);

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

        return data; // Return the response data (important for handleSubmit)
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
        throw error; // Ensure the error is propagated
    }
};


export const getOrderById = (orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`/api/orders/${orderId}`);
        console.log('Fetched Order: ', data);
        dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message });
    }
};

export const getOrdersRequest = () => ({
    type: GET_ORDERS_REQUEST,
});

export const getOrdersSuccess = (orders) => ({
    type: GET_ORDERS_SUCCESS,
    payload: orders, // payload will hold the list of orders
});

export const getOrdersFailure = (error) => ({
    type: GET_ORDERS_FAILURE,
    payload: error, // payload will hold the error message
});

