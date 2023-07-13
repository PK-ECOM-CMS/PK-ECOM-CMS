import { configureStore } from "@reduxjs/toolkit";
import adminUserReducer from "./pages/admin-login/userSlice";
import systemReducer from "./pages/system-state/systemSlice";
import categoriesReducer from "./pages/categories/categorySlice";
import paymentMethodReducer from "./pages/paymentMethods/paymentmethodSlice";
import itemsReducer from "./pages/items/itemSlice";
import ordersReducer from "./pages/orders/orderSlice";
import usersReducer from "./pages/users/usersSlice";
import reviewsReducer from "./pages/reviews/reviewsSlice";
import productsReducer from "./pages/products/productsSlice";
const store = configureStore({
  reducer: {
    system: systemReducer,
    admin: adminUserReducer,
    categories: categoriesReducer,
    products: productsReducer,
    items: itemsReducer,
    paymentMethods: paymentMethodReducer,
    orders: ordersReducer,
    reviews: reviewsReducer,
    users: usersReducer,
  },
});
export default store;
