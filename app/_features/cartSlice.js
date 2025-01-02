"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CartApis from "../_utils/CartApis";

// **Thunk لجلب بيانات السلة**
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (email, { rejectWithValue }) => {
    try {
      const response = await CartApis.getUserCartItems(email);
      return response.data.data; // بيانات المنتجات من الـ API
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// **الحالة الابتدائية**
const initialState = {
  items: [], // بيانات المنتجات في السلة
  totalItems: 0, // إجمالي عدد العناصر في السلة
  totalPrice: 0, // إجمالي السعر
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { documentId, name, price, category } = action.payload;

      // البحث عن المنتج في السلة
      const existingItem = state.items.find(
        (item) => item.documentId === documentId
      );

      if (existingItem) {
        // زيادة الكمية إذا كان المنتج موجودًا
        existingItem.quantity += 1;
      } else {
        // إضافة المنتج للسلة بكميته الافتراضية = 1
        state.items.push({
          documentId,
          name,
          price,
          category,
          quantity: 1,
        });
      }

      // تحديث إجمالي عدد العناصر وإجمالي السعر
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },

    removeFromCart: (state, action) => {
      // إزالة المنتج المحدد من السلة
      state.items = state.items.filter(
        (item) => item.documentId !== action.payload
      );

      // تحديث إجمالي عدد العناصر وإجمالي السعر
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { documentId, quantity } = action.payload;

      // تحديث الكمية للمنتج المحدد
      const existingItem = state.items.find(
        (item) => item.documentId === documentId
      );
      if (existingItem) {
        existingItem.quantity = quantity;
      }

      // تحديث إجمالي عدد العناصر وإجمالي السعر
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
    clearCart: (state) => {
      // إعادة تعيين السلة بالكامل
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        // إضافة خاصية `quantity` الافتراضية لكل منتج
        state.items = action.payload.map((item) => ({
          ...item,
          quantity: 1, // تعيين الكمية الافتراضية = 1
        }));
        state.totalItems = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalPrice = state.items.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        );
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
