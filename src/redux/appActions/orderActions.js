import APIServices from "../../utils/apiServices";
import { 
    CANCEL_ORDER, 
    GET_ORDER_DETAILS, 
    GET_SPECIFIC_BUYER_ORDERS, 
    GET_SPECIFIC_SELLER_ORDERS, 
    UNDO_CANCEL_ORDER 
} from "../App/actionTypes";

const getSellerOrders = (sellerOrders) => ({
    type: GET_SPECIFIC_SELLER_ORDERS,
    payload: sellerOrders,
});

export const handleGetSellerOrders = (seller_id) => async (dispatch) => {
    try {
        const { data } = await APIServices.getSellersOrders(seller_id);
        dispatch(getSellerOrders(data));
    } catch (error) {
        console.log(`Error from handleGetSellerOrders: ${error}`);
    }
};

const getBuyerOrders = (buyerOrders) => ({
    type: GET_SPECIFIC_BUYER_ORDERS,
    payload: buyerOrders,
});

export const handleGetBuyerOrders = (buyer_id) => async (dispatch) => {
    try {
        const { data } = await APIServices.getAllBuyerOrders(buyer_id);
        dispatch(getBuyerOrders(data));
    } catch (error) {
        console.log(`Error from handleGetBuyerOrders: ${error}`);
    }
};

const getOrderDetails = (orderDetails) => ({
    type: GET_ORDER_DETAILS,
    payload: orderDetails,
});

export const handleGetOrderDetails = (seller_id, order_id) => async (dispatch) => {
    try {
        const { data } = await APIServices.viewOrderClient(seller_id, order_id);
        dispatch(getOrderDetails(data));
    } catch (error) {
        console.log(`Error from handleGetOrderDetails: ${error}`);
    }
};

export const handleAddToCancelled = (order) => ({
    type: CANCEL_ORDER,
    payload: order,
});

export const handleRemoveFromCancelled = (order) => ({
    type: UNDO_CANCEL_ORDER,
    payload: order,
});
