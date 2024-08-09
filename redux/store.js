import { configureStore } from "@reduxjs/toolkit"; // Redux Toolkit'ten configureStore fonksiyonunu içe aktarır
import cartReducer from "./cartSlice"; // Alışveriş sepeti azaltıcısını içe aktarır

export default configureStore({
  reducer: {
    cart: cartReducer, // Mağaza için cartReducer'ı kullanır
  },
});
