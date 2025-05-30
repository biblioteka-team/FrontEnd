import { RootState } from '../store'

export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartAmount = (state: RootState) => state.cart.amount;
export const selectCartTotal = (state: RootState) => state.cart.total;