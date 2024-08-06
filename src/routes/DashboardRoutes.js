import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';
import ProductDetailsPage from "../pages/ProductDetails/ProductDetailsPage.js";
import { CategoryPage } from "../pages/Categories/CategoryPage.js";
import { SearchResultsProducts } from "../pages/SearchResults/SearchResultsProducts.js";
import AddProduct from "../pages/AddProduct/AddProduct.js";
import { SearchResultsSellers } from "../pages/SearchResults/SearchResultsSellers.js";
import { CompanyProfilePage } from "../pages/CompanyProfile/CompanyProfilePage.js";
import { CompanyCategoryPage } from "../pages/CompanyProducts/CompanyCategoryPage.js";
import { Cart } from "../pages/Cart/Cart.js";
import CheckoutPage from "../pages/Checkout/CheckoutPage.js";
import { CompanyOrders } from "../pages/CompanyOrders/CompanyOrders.js";
import { ClientOrders } from "../pages/ClientOrders/ClientOrders.js";
import { OrderDetails } from "../pages/OrderDetails/OrderDetails.js";

const DashboardRoutes = () => (
  <Switch>
    <PrivateRoute exact path="/product-details/:productId" component={ProductDetailsPage} />
    <PrivateRoute exact path="/products" component={SearchResultsProducts} />
    <PrivateRoute exact path="/sellers/:sellerId/items" component={SearchResultsSellers} />
    <PrivateRoute exact path="/upload" component={AddProduct} />
   
    <PrivateRoute exact path="/seller/:sellerId/profile" component={CompanyProfilePage} />
    <PrivateRoute exact path="/categories/:categoryName" component={CategoryPage} />
    <PrivateRoute exact path="/sellers/:sellerId/:sellerName/:categoryName" component={CompanyCategoryPage} />
    <PrivateRoute exact path="/cart" component={Cart} />
    <PrivateRoute exact path="/products/:SellerId/addproduct" component={AddProduct} />
    <PrivateRoute exact path="/orders" component={CompanyOrders} />
    <PrivateRoute exact path="/client/orders" component={ClientOrders} />
    <PrivateRoute exact path="/orders/order-details/:orderId" component={OrderDetails} />
    <PrivateRoute exact path="/checkout" component={CheckoutPage} />
  </Switch>
);

export default DashboardRoutes;
