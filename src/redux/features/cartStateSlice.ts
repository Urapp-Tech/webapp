import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getItem } from '../../utilities/local-storage';

export type CartItem = {
  id: number;
  price: number;
  name: string;
  image: string;
  quantity: number;
};

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setInitialCart: (state) => {
      const cartItems = getItem<CartItem[]>('CART_ITEMS');
      if (cartItems) {
        state.cartItems = cartItems;
      }
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const cartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (cartItemIndex === -1) {
        state.cartItems.push(action.payload);
        localStorage.setItem('CART_ITEMS', JSON.stringify(state.cartItems));
        return;
      }
      state.cartItems[cartItemIndex].quantity += action.payload.quantity;
      localStorage.setItem('CART_ITEMS', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem('CART_ITEMS', JSON.stringify(state.cartItems));
    },
    incrementItemQuantity: (state, action: PayloadAction<number>) => {
      const cartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems[cartItemIndex].quantity += 1;
      localStorage.setItem('CART_ITEMS', JSON.stringify(state.cartItems));
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const cartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (state.cartItems[cartItemIndex].quantity <= 0) {
        state.cartItems[cartItemIndex].quantity = 0;
        localStorage.setItem('CART_ITEMS', JSON.stringify(state.cartItems));
      }
      state.cartItems[cartItemIndex].quantity -= 1;
      localStorage.setItem('CART_ITEMS', JSON.stringify(state.cartItems));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  removeFromCart,
  incrementItemQuantity,
  decrementQuantity,
  setInitialCart,
} = cartSlice.actions;

export default cartSlice.reducer;
