import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getItem, setItem } from '../../utilities/local-storage';

export type CartItem = {
  id: number;
  price: number;
  name: string;
  image: string;
  quantity: number;
};

export type GetCart = {
  appUser: string | null;
  appUserAddres: string | null;
  appUserDevice: string;
  createdDate: string;
  dropDateTime: string | null;
  grandTotal: string;
  gstAmount: string;
  gstPercentage: 10;
  id: string;
  pickupDateTime: string | null;
  promoCode: string | null;
  status: string;
  tenant: string;
  totalAmount: string;
  updatedDate: string;
};
export interface CartState {
  cartItems: CartItem[];
  getCart: GetCart | null;
  cartData: null;
  newOrder: [] | null;
}

const initialState: CartState = {
  cartItems: [],
  getCart: null,
  cartData: null,
  newOrder: null,
};

export const cartSlice: any = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getCart: (state, action: PayloadAction<GetCart>) => {
      setItem('RegisteredCart', action.payload);
      state.getCart = action.payload;
    },
    Cart: (state, action: PayloadAction<null>) => {
      state.cartData = action.payload;
    },
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
    newOrder: (state, action: PayloadAction<[]>) => {
      state.newOrder = action.payload;
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
  getCart,
  Cart,
  newOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
