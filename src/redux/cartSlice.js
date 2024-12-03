import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
	try {
		const cart = localStorage.getItem('newCart');
		if (cart && cart !== 'undefined') {
			return JSON.parse(cart);
		} else {
			return [];
		}
	} catch (error) {
		console.error('Error parsing JSON from localStorage', error);
		return [];
	}
};

const loadAmountFromLocalStorage = () => {
	try {
		const amount = localStorage.getItem('newAmount');
		if (amount && amount !== 'undefined') {
			return JSON.parse(amount);
		} else {
			return 0;
		}
	} catch (error) {
		console.error('Error parsing JSON from localStorage', error);
		return 0;
	}
};

const saveCartToLocalStorage = (cartItems, amount) => {
	try {
		localStorage.setItem('newCart', JSON.stringify(cartItems));
		localStorage.setItem('newAmount', JSON.stringify(amount));
	} catch (error) {
		console.error('Error saving JSON to localStorage', error);
	}
};

const initialState = {
	cartItems: loadCartFromLocalStorage(),
	amount: loadAmountFromLocalStorage(),
	total: 0,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clearCart: state => {
			state.cartItems = [];
			state.amount = 0;
			saveCartToLocalStorage(state.cartItems, state.amount);
		},
		addToCart: (state, action) => {
			const item = action.payload;
			const existingItem = state.cartItems.find(
				cartItem => cartItem._id === item._id
			);
			if (existingItem) {
				existingItem.qty += 1;
			} else {
				state.cartItems.push({ ...item, qty: 1 });
			}
			state.amount = state.cartItems.reduce(
				(total, item) => total + item.qty,
				0
			);
			saveCartToLocalStorage(state.cartItems, state.amount);
		},
		removeFromCart: (state, action) => {
			const itemId = action.payload;
			const itemToRemove = state.cartItems.find(item => item._id === itemId);
			if (itemToRemove) {
				state.cartItems = state.cartItems.filter(item => item._id !== itemId);
			}
			state.amount = state.cartItems.reduce(
				(total, item) => total + item.qty,
				0
			);
			saveCartToLocalStorage(state.cartItems, state.amount);
		},
		increase: (state, { payload }) => {
			const cartItem = state.cartItems.find(item => item._id === payload._id);
			if (cartItem) {
				cartItem.qty += 1;
			}
			state.amount = state.cartItems.reduce(
				(total, item) => total + item.qty,
				0
			);
			saveCartToLocalStorage(state.cartItems, state.amount);
		},
		decrease: (state, { payload }) => {
			const cartItem = state.cartItems.find(item => item._id === payload._id);
			if (cartItem && cartItem.qty > 1) {
				cartItem.qty -= 1;
			} else if (cartItem && cartItem.qty === 1) {
				state.cartItems = state.cartItems.filter(
					item => item._id !== payload._id
				);
			}
			state.amount = state.cartItems.reduce(
				(total, item) => total + item.qty,
				0
			);
			saveCartToLocalStorage(state.cartItems, state.amount);
		},

		calculateTotals: state => {
			let total = 0;
			state.cartItems.forEach(item => {
				const priceObject = item.price && item.price[0];

				if (priceObject && priceObject.discounted_price) {
					total += item.qty * priceObject.discounted_price;
				} else if (priceObject && priceObject.original_price) {
					total += item.qty * priceObject.original_price;
				} else {
					console.warn(
						`Item with id ${item._id} does not have a valid original_price`
					);
				}
			});
			state.total = total;
		},

		updateQuantity: (state, action) => {
			const { _id, qty } = action.payload;
			const item = state.cartItems.find((item) => item._id === _id);
			if (item) {
				item.qty = qty;
			}
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
	updateQuantity
} = cartSlice.actions;
export default cartSlice.reducer;
