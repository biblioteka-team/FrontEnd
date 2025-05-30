import { createSlice } from '@reduxjs/toolkit'

const loadCartFromLocalStorage = () => {
	try {
		const cart = localStorage.getItem('newCart')
		if (cart && cart !== 'undefined') {
			return JSON.parse(cart)
		} else {
			return []
		}
	} catch (error) {
		console.error('Error parsing JSON from localStorage', error)
		return []
	}
}

const loadAmountFromLocalStorage = () => {
	try {
		const amount = localStorage.getItem('newAmount')
		if (amount && amount !== 'undefined') {
			return JSON.parse(amount)
		} else {
			return 0
		}
	} catch (error) {
		console.error('Error parsing JSON from localStorage', error)
		return 0
	}
}

const saveCartToLocalStorage = (cartItems, amount) => {
	try {
		localStorage.setItem('newCart', JSON.stringify(cartItems))
		localStorage.setItem('newAmount', JSON.stringify(amount))
	} catch (error) {
		console.error('Error saving JSON to localStorage', error)
	}
}

const initialState = {
	cartItems: loadCartFromLocalStorage(),
	amount: loadAmountFromLocalStorage(),
	total: 0,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clearCart: state => {
			state.cartItems = []
			state.amount = 0
			saveCartToLocalStorage(state.cartItems, state.amount)
		},
		addToCart: (state, action) => {
			const item = action.payload
			const existingItem = state.cartItems.find(
				cartItem => cartItem.id === item.id
			)
			if (existingItem) {
				existingItem.qty += 1
			} else {
				state.cartItems.push({ ...item, qty: 1 })
			}
			state.amount = state.cartItems.reduce(
				(total, item) => total + item.qty,
				0
			)
			saveCartToLocalStorage(state.cartItems, state.amount)
		},
		removeFromCart: (state, action) => {
			const itemId = action.payload
			const itemToRemove = state.cartItems.find(item => item.id === itemId)
			if (itemToRemove) {
				state.cartItems = state.cartItems.filter(item => item.id !== itemId)
			}
			state.amount = state.cartItems.reduce(
				(total, item) => total + item.qty,
				0
			)
			saveCartToLocalStorage(state.cartItems, state.amount)
		},
		increase: (state, { payload }) => {
			const cartItem = state.cartItems.find(item => item.id === payload.id)
			if (cartItem) {
				cartItem.qty += 1
			}
			state.amount = state.cartItems.reduce(
				(total, item) => total + item.qty,
				0
			)
			saveCartToLocalStorage(state.cartItems, state.amount)
		},
		decrease: (state, { payload }) => {
			const cartItem = state.cartItems.find(item => item.id === payload.id)
			if (cartItem && cartItem.qty > 1) {
				cartItem.qty -= 1
			} else if (cartItem && cartItem.qty === 1) {
				state.cartItems = state.cartItems.filter(
					item => item.id !== payload.id
				);
			}
			state.amount = state.cartItems.reduce(
				(total, item) => total + item.qty,
				0
			)
			saveCartToLocalStorage(state.cartItems, state.amount)
		},

		calculateTotals: state => {
			let total = 0
			state.cartItems.forEach(item => {
				if (typeof item.price === 'number') {
					total += item.qty * item.price
				} else {
					console.warn(`Item with id ${item.id} does not have a valid price`)
				}
			})
			state.total = total
		},
	},
})

export const {
	addToCart,
	removeFromCart,
	clearCart,
	increase,
	decrease,
	calculateTotals,
} = cartSlice.actions
export default cartSlice.reducer
