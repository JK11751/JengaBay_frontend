import axios from "axios";
import { getToken } from "./useToken";

const baseURL = 'http://localhost:8000'; // base URL for all endpoints

const apiConfig = {
    baseURL,
    timeout: 30000, // Adjusted to a reasonable timeout
    headers: {
      'Content-Type': 'application/json',
    },
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    },
};

const api = axios.create({ ...apiConfig });

// Token authentication using axios interceptors
api.interceptors.request.use(
  (config) => {
    const token = getToken(); 
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// Handle response errors globally
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.error("Invalid token. Please log in again.", error.response);
    }
    return Promise.reject(error);
  }
);

class APIServices {
  /*----------------------------------USERS-------------------------------------- */ 

  // Logging in a user
  async loginUser(data) {
    return api.post(`/login`, data);
  }

  // Logging out a user
  async logoutUser() {
    return api.post(`/accounts/logout/`);
  }

  // Password reset request
  async passwordReset(data) {
    return api.post(`/accounts/password_reset/`, data);
  }

  // Password reset confirmation
  async passwordResetConfirm(data) {
    return api.post(`/accounts/password_reset/confirm/`, data);
  }

  /*----------------------------------CLIENTS-------------------------------------- */  

  // Creating a client
  async createClient(data) {
    return api.post(`/create_buyer`, data);
  }

  // Getting a client's profile
  async getClientProfile(buyer_id) {
    return api.get(`/buyers/${buyer_id}/profile`);
  }

  // Updating a client's profile
  async updateClientProfile(buyer_id, data) {
    return api.put(`/buyers/${buyer_id}/profile`, data);
  }

  // Deleting a client's profile
  async deleteClientProfile(buyer_id) {
    return api.delete(`/buyers/${buyer_id}/profile`);
  }

  // Getting a client's details
  async getClientDetails(buyer_id) {
    return api.get(`/buyers/${buyer_id}`);
  }

  /*----------------------------------PRODUCTS-------------------------------------- */

  // Getting all products
  async getProducts() {
    return api.get(`/items`);
  }

  // Getting details of a specific product
  async getProductDetails(item_id) {
    return api.get(`/items/${item_id}`);
  }

  // Getting items in a specific category
  async getItemsInSpecificCategory(category_name) {
    return api.get(`/items?category=${category_name}`);
  }

  // Searching items that meet specific criteria
  async searchItems(query_string) {
    return api.get(`/items?search=${query_string}`);
  }

  /*----------------------------------SELLERS-------------------------------------- */

  // Getting all sellers
  async getAllSellers() {
    return api.get(`/sellers/`);
  }

  // Creating a seller in the database
  async createSeller(data) {
    return api.post(`/create_seller_account`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${getToken()}`, 
      }
    });
  }

  // Getting details of a specific seller
  async getSellerDetails(seller_id) {
    return api.get(`/sellers/${seller_id}`);
  }

  // Getting profile of a specific seller
  async getSellerProfile(seller_id) {
    return api.get(`/sellers/${seller_id}/profile`, {
      headers: {
        Authorization: `Token ${getToken()}`,
      }
    });
  }

  // Updating profile of a specific seller with patch
  async updateSellerProfile(seller_id, data) {
    return api.patch(`/sellers/${seller_id}/profile`, data, {
      headers: {
        Authorization: `Token ${getToken()}`,
      }
    });
  }

  // Updating profile picture of a specific seller
  async updateSellerProfilePic(seller_id, data) {
    return api.put(`/sellers/${seller_id}/profile`, data, {
      headers: {
        Authorization: `Token ${getToken()}`,
      }
    });
  }

  // Deleting profile of a specific seller
  async deleteSellerProfile(seller_id) {
    return api.delete(`/sellers/${seller_id}/profile`);
  }

  /*--------------------------------SELLER ITEMS----------------------------------- */

  // Getting all items belonging to a specific seller
  async getSellerItems(seller_id) {
    return api.get(`/sellers/${seller_id}/items`);
  }

  // Getting a specific item belonging to a specific seller
  async getSellerItem(seller_id, item_id) {
    return api.get(`/sellers/${seller_id}/items/${item_id}`);
  }

  // Getting items belonging to a specific category from a specific seller
  async getSellerItemsInSpecificCategory(seller_id, category_name) {
    return api.get(`/sellers/${seller_id}/items?category=${category_name}`);
  }

  // Searching for items belonging to a specific seller
  async searchingSellerItems(seller_id, query_string) {
    return api.get(`/sellers/${seller_id}/items?search=${query_string}`);
  }

  // Adding an item by a specific seller
  async addItem(seller_id, data) {
    return api.post(`/sellers/${seller_id}/items/add_item`, data, {
      headers: {
        Authorization: `Token ${getToken()}`,
      }
    });
  }

  // Updating details of a specific item belonging to a specific seller
  async updateSellerItem(seller_id, item_id, data) {
    return api.put(`/sellers/${seller_id}/items/${item_id}`, data);
  }

  // Deleting a specific item belonging to a specific seller
  async deleteSellerItem(seller_id, item_id) {
    return api.delete(`/sellers/${seller_id}/items/${item_id}`);
  }

  /*-----------------------------------ORDERS---------------------------------------- */

  // Creating an order
  async createOrder(data) {
    return api.post(`/submit_order`, data);
  }

  // Viewing orders for a specific seller
  async getSellersOrders(seller_id) {
    return api.get(`/sellers/${seller_id}/orders`, {
      headers: {
        Authorization: `Token ${getToken()}`,
      }
    });
  }

  // Viewing a specific order for a seller
  async viewOrderClient(seller_id, order_id) {
    return api.get(`/sellers/${seller_id}/orders/${order_id}`, {
      headers: {
        Authorization: `Token ${getToken()}`,
      }
    });
  }

  // Getting all orders made by a specific buyer
  async getAllBuyerOrders(buyer_id) {
    return api.get(`buyers/${buyer_id}/orders`, {
      headers: {
        Authorization: `Token ${getToken()}`,
      }
    });
  }

  // Viewing, updating, or deleting a specific order
  async viewOrder(seller_id, order_id) {
    return api.get(`/sellers/${seller_id}/orders/${order_id}/edit`);
  }

  // Updating a specific order
  async editOrder(seller_id, order_id, data) {
    return api.put(`/sellers/${seller_id}/orders/${order_id}/edit`, data);
  }

  // Deleting a specific order
  async deleteOrder(seller_id, order_id) {
    return api.delete(`/sellers/${seller_id}/orders/${order_id}/edit`);
  }
}

const instance = new APIServices(); 

export default instance;