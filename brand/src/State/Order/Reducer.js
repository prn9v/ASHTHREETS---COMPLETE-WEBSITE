import { 
    CREATE_ORDER_REQUEST, 
    CREATE_ORDER_SUCCESS, 
    CREATE_ORDER_FAILURE, 
    GET_ORDER_BY_ID_REQUEST, 
    GET_ORDER_BY_ID_SUCCESS, 
    GET_ORDER_BY_ID_FAILURE, 
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE,
    ORDER_HISTORY_REQUEST,
    ORDER_HISTORY_SUCCESS,
    ORDER_HISTORY_FAILURE
} from './Actiontype';

const initialState = {
    orders: [],         // Stores a list of orders
    order: null,        // Stores details of a single order
    orderHistory: [],   // Stores order history for the user
    loading: false,     // Indicates loading state for API calls
    error: null,        // Stores error messages if any
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        // Create Order
        case CREATE_ORDER_REQUEST:
            return { ...state, loading: true, error: null };
        case CREATE_ORDER_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                orders: [...state.orders, action.payload], // Add new order to orders list
                error: null 
            };
        case CREATE_ORDER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // Get Order by ID
        case GET_ORDER_BY_ID_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_ORDER_BY_ID_SUCCESS:
            return { ...state, loading: false, order: action.payload, error: null };
        case GET_ORDER_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // Get All Orders
        case GET_ORDERS_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_ORDERS_SUCCESS:
            return { ...state, orders: action.payload, loading: false, error: null };
        case GET_ORDERS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // Order History
        case ORDER_HISTORY_REQUEST:
            return { ...state, loading: true, error: null };
        case ORDER_HISTORY_SUCCESS:
            return { ...state, loading: false, orderHistory: action.payload, error: null };
        case ORDER_HISTORY_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
