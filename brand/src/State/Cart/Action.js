import {api} from '../../config/apiConfig'
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_ITEM_TO_CART_FAILURE, REMOVE_ITEM_TO_CART_REQUEST, REMOVE_ITEM_TO_CART_SUCCESS, UPDATE_ITEM_TO_CART_FAILURE, UPDATE_ITEM_TO_CART_REQUEST, UPDATE_ITEM_TO_CART_SUCCESS } from './Actiontype'

export const get = () => async(dispatch) => {
    dispatch({type:GET_CART_REQUEST})

    try {
        const { data } = await api.get(`/api/cart`);
        
        dispatch({type:GET_CART_SUCCESS,payload: data})
    } catch (error) {
        dispatch({type:GET_CART_FAILURE,payload: error.message})
    }
}

export const addItemToCART = (reqData) => async(dispatch) => {
    dispatch({type:ADD_ITEM_TO_CART_REQUEST})

    try {
        const { data } = await api.put("/api/cart/add",reqData)
        dispatch({type:ADD_ITEM_TO_CART_SUCCESS,payload: data})
    } catch (error) {
        dispatch({type:ADD_ITEM_TO_CART_FAILURE,payload: error.message})
    }
}

export const removeItemToCART = (reqData) => async(dispatch) => {
    dispatch({type:REMOVE_ITEM_TO_CART_REQUEST})

    try {
        const { data } = await api.delete(`/api/cart_items/${reqData}`);
        dispatch({type:REMOVE_ITEM_TO_CART_SUCCESS,payload: reqData.cartItemId})
    } catch (error) {
        dispatch({type:REMOVE_ITEM_TO_CART_FAILURE,payload: error.message})
    }
}

export const updateItemToCART = (cartItemData) => async (dispatch) => {
    dispatch({ type: UPDATE_ITEM_TO_CART_REQUEST });

    try {
        // Make sure to send cartItemData with the request, which contains the quantity and any other necessary data
        const { data } = await api.put(`/api/cart_items/${cartItemData.CartItemId}`, cartItemData.data);
        console.log("Data of updated cart item is: ", data);
        dispatch({
            type: UPDATE_ITEM_TO_CART_SUCCESS,
            payload: data, // Payload should contain the updated cart item
        });
    } catch (error) {
        dispatch({
            type: UPDATE_ITEM_TO_CART_FAILURE,
            payload: error.message,
        });
    }
};