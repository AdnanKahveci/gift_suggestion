import { createSlice } from "@reduxjs/toolkit"; // Redux Toolkit'ten createSlice fonksiyonunu içe aktarır

const cartSlice = createSlice({
  name: "cart", // Dilim adı
  initialState: { // Başlangıç durumu
    products: [], // Ürünler dizisi
    quantity: 0, // Ürün sayısı
    total: 0, // Toplam fiyat
  },
  reducers: { // Azaltıcılar
    addProduct: (state, action) => { // Ürün ekleme azaltıcısı
      state.products.push(action.payload); // Ürünü diziyi ekler
      state.quantity += action.payload.quantity; // Ürün miktarını artırır
      state.total += action.payload.price; // Toplam fiyatı günceller
    },
    reset: (state, action) => { // Sıfırlama azaltıcısı
      state.products = []; // Ürünleri sıfırlar
      state.quantity = 0; // Ürün sayısını sıfırlar
      state.total = 0; // Toplam fiyatı sıfırlar
    },
  },
});

export const { addProduct, reset } = cartSlice.actions; // Dilimden eylemleri dışa aktarır
export default cartSlice.reducer; // Dilimi dışa aktarır
