import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, CartState } from './types'
import { loadAmountFromLocalStorage, loadCartFromLocalStorage, saveCartToLocalStorage } from './utils'

const initialState: CartState = {
  cartItems: loadCartFromLocalStorage(),
  amount: loadAmountFromLocalStorage(),
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      saveCartToLocalStorage(state.cartItems, state.amount);
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.cartItems.push({ ...item, qty: 1 });
      }
      
      state.amount = state.cartItems.reduce((total, item) => total + item.qty, 0);
      saveCartToLocalStorage(state.cartItems, state.amount);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
      state.amount = state.cartItems.reduce((total, item) => total + item.qty, 0);
      saveCartToLocalStorage(state.cartItems, state.amount);
    },
    increase: (state, action: PayloadAction<{ id: string }>) => {
      const cartItem = state.cartItems.find(item => item.id === action.payload.id);
      if (cartItem) {
        cartItem.qty += 1;
        state.amount = state.cartItems.reduce((total, item) => total + item.qty, 0);
        saveCartToLocalStorage(state.cartItems, state.amount);
      }
    },
    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const cartItem = state.cartItems.find(item => item.id === action.payload.id);
      if (cartItem) {
        if (cartItem.qty > 1) {
          cartItem.qty -= 1;
        } else {
          state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
        }
        state.amount = state.cartItems.reduce((total, item) => total + item.qty, 0);
        saveCartToLocalStorage(state.cartItems, state.amount);
      }
    },
    calculateTotals: (state) => {
      state.total = state.cartItems.reduce((total, item) => {
        if (typeof item.price === 'number') {
          return total + (item.qty * item.price);
        }
        console.warn(`Item with id ${item.id} does not have a valid price`);
        return total;
      }, 0);
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  clearCart,
  increase,
  decrease,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;