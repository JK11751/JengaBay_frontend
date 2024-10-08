import { 
    CANCEL_ORDER, 
    GET_ORDER_DETAILS, 
    GET_SPECIFIC_BUYER_ORDERS, 
    GET_SPECIFIC_SELLER_ORDERS, 
    UNDO_CANCEL_ORDER,
    DELETE_ORDER,
    EDIT_ORDER,
} from "../App/actionTypes";

const initialState = {
    buyerOrders: [],
    sellerOrders: [],
    orderDetails: [],
    cancelledOrders: [],
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPECIFIC_BUYER_ORDERS:
            return {
                ...state,
                buyerOrders: Array.isArray(action.payload) ? action.payload : [],
            };
        case GET_SPECIFIC_SELLER_ORDERS:
            return {
                ...state,
                sellerOrders: Array.isArray(action.payload) ? action.payload : [],
            };
        case GET_ORDER_DETAILS:
            return {
                ...state,
                orderDetails: action.payload,
            };
        case CANCEL_ORDER:
            return {
                ...state,
                cancelledOrders: [...state.cancelledOrders, action.payload],
            };
        case UNDO_CANCEL_ORDER:
            return {
                ...state,
                cancelledOrders: state.cancelledOrders.filter(order => order.id !== action.payload.id),
            };
            case EDIT_ORDER:
                return {
                    ...state,
                    orders: state.orders.map((order) =>
                        order.id === action.payload.id ? action.payload : order
                    ),
                };
            case DELETE_ORDER:
                return {
                    ...state,
                    orders: state.orders.filter((order) => order.id !== action.payload),
                };
        default:
            return state;
    }
};

export default orderReducer;
