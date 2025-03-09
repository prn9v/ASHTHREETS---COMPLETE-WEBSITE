// Reducer.js
import {
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE,
    SHIP_ORDERS_REQUEST,
    SHIP_ORDERS_SUCCESS,
    SHIP_ORDERS_FAILURE,
    DELIVERED_ORDERS_REQUEST,
    DELIVERED_ORDERS_SUCCESS,
    DELIVERED_ORDERS_FAILURE,
    DELETE_ORDERS_REQUEST,
    DELETE_ORDERS_SUCCESS,
    DELETE_ORDERS_FAILURE,
    CONFIRMED_ORDERS_REQUEST,
    CONFIRMED_ORDERS_SUCCESS,
    CONFIRMED_ORDERS_FAILURE,
    CANCELLED_ORDERS_REQUEST,
    CANCELLED_ORDERS_SUCCESS,
    CANCELLED_ORDERS_FAILURE,
    PLACED_ORDERS_REQUEST,
    PLACED_ORDERS_SUCCESS,
    PLACED_ORDERS_FAILURE
} from "./ActionType";

const initialState = {
    loading: false,
    orders: [],
    error: "",
    shipped: null,
    confirmed: null,
    placed: null,
    delivered: null,
    cancelled: null,
    deletedOrder: null,
};

const adminOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };
        case GET_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                orders: [],
                error: action.payload,
            };

        case CONFIRMED_ORDERS_REQUEST:
        case PLACED_ORDERS_REQUEST:
        case DELIVERED_ORDERS_REQUEST:
        case CANCELLED_ORDERS_REQUEST:
        case SHIP_ORDERS_REQUEST:
        case DELETE_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: "",
            };

        case CONFIRMED_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                confirmed: action.payload,
            };
        case PLACED_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                placed: action.payload,
            };
        case DELIVERED_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                delivered: action.payload,
            };
        case CANCELLED_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                cancelled: action.payload,
            };
        case SHIP_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                shipped: action.payload,
            };
        case DELETE_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                deletedOrder: action.payload,
            };

        case CONFIRMED_ORDERS_FAILURE:
        case PLACED_ORDERS_FAILURE:
        case DELIVERED_ORDERS_FAILURE:
        case CANCELLED_ORDERS_FAILURE:
        case SHIP_ORDERS_FAILURE:
        case DELETE_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default adminOrderReducer;
