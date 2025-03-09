import { 
    ADD_ITEM_TO_CART_FAILURE, 
    ADD_ITEM_TO_CART_REQUEST, 
    ADD_ITEM_TO_CART_SUCCESS, 
    GET_CART_FAILURE, 
    GET_CART_REQUEST, 
    GET_CART_SUCCESS, 
    REMOVE_ITEM_TO_CART_FAILURE, 
    REMOVE_ITEM_TO_CART_REQUEST, 
    REMOVE_ITEM_TO_CART_SUCCESS, 
    UPDATE_ITEM_TO_CART_FAILURE, 
    UPDATE_ITEM_TO_CART_REQUEST, 
    UPDATE_ITEM_TO_CART_SUCCESS 
} from "./Actiontype"

const initialState = {
    cart: null,
    loading: false,
    error: null,
    cartItems: [], // Tracks items in the cart
};

export const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        // Add item to cart
        case ADD_ITEM_TO_CART_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_ITEM_TO_CART_SUCCESS:
            return { 
                ...state, 
                cartItems: [...state.cartItems, action.payload.cartItem], // Assuming action.payload.cartItem contains the item to add
                loading: false 
            };
        case ADD_ITEM_TO_CART_FAILURE:
            return { ...state, loading: false, error: action.payload };
        
        // Get cart details
        case GET_CART_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_CART_SUCCESS:
            return { 
                ...state, 
                cartItems: action.payload.cartItems, // Assuming payload has the cartItems array
                cart: action.payload, // Assuming payload has other cart details like total, etc.
                loading: false,
                error: null 
            };
        case GET_CART_FAILURE:
            return { ...state, error: action.payload, loading: false };
        
        // Remove item from cart
        case REMOVE_ITEM_TO_CART_REQUEST:
        case UPDATE_ITEM_TO_CART_REQUEST:
            return { ...state, loading: true, error: null };
        case REMOVE_ITEM_TO_CART_SUCCESS:
            return { 
                ...state, 
                cartItems: state.cartItems.filter(item => item.id !== action.payload.cartItemId), // Remove item by ID
                loading: false, 
                error: null 
            };
        
        // Update item in cart
        case UPDATE_ITEM_TO_CART_SUCCESS:
            return { 
                ...state, 
                cartItems: state.cartItems.map(item => 
                    item.id === action.payload.cartItem.id 
                    ? action.payload.cartItem 
                    : item
                ), // Update item by matching ID
                loading: false, 
                error: null 
            };

        case REMOVE_ITEM_TO_CART_FAILURE:
        case UPDATE_ITEM_TO_CART_FAILURE:
            return { ...state, error: action.payload, loading: false };
        
        default:
            return state;
    }
};
