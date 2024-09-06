import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../useSlice/productSlice";
import cartSlice from "../useSlice/cartSlice";
import orderSlice from "../useSlice/orderSlice";
import statisticSlice from "../useSlice/statisticSlice";
import authSlice from "../useSlice/authSlice";
import categorySlice from "../useSlice/categorySlice";
import userSlice from "../useSlice/userSlice";

const store = configureStore({
  reducer: {
    product: productSlice,
    auth: authSlice,
    cart: cartSlice,
    order: orderSlice,
    statistics: statisticSlice,
    category: categorySlice,
    user: userSlice,
  },
});

export default store;
