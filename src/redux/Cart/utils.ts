import { CartItem } from './types'

export const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const cart = localStorage.getItem('newCart');
    if (cart && cart !== 'undefined') {
      return JSON.parse(cart);
    }
    return [];
  } catch (error) {
    console.error('Error parsing JSON from localStorage', error);
    return [];
  }
};

export const loadAmountFromLocalStorage = (): number => {
  try {
    const amount = localStorage.getItem('newAmount');
    if (amount && amount !== 'undefined') {
      return JSON.parse(amount);
    }
    return 0;
  } catch (error) {
    console.error('Error parsing JSON from localStorage', error);
    return 0;
  }
};

export const saveCartToLocalStorage = (cartItems: CartItem[], amount: number): void => {
  try {
    localStorage.setItem('newCart', JSON.stringify(cartItems));
    localStorage.setItem('newAmount', JSON.stringify(amount));
  } catch (error) {
    console.error('Error saving JSON to localStorage', error);
  }
};