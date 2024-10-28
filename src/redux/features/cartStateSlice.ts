import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Item } from '../../interfaces/product';
import { getItem, removeItem, setItem } from '../../utilities/local-storage';

export type CartItem = {
  id: string;
  price: number;
  name: string;
  image: string;
  quantity: number;
  buyCount: number;
};

export type CartData = {
  appUser: string | null;
  appUserAddress: string | null;
  appUserDevice: string;
  createdDate: string;
  dropDateTime: string | null;
  grandTotal: string;
  gstAmount: string;
  gstPercentage: number;
  id: string;
  pickupDateTime: string | null;
  voucherCode: string | null;
  status: string;
  tenant: string;
  totalAmount: string;
  updatedDate: string;
};
export interface CartState {
  cartItems: Array<CartItem>;
  cartData: CartData | null;
  newOrder: Array<any> | null;
}

const initialCartItems = getItem<Array<CartItem>>('CART_ITEMS') ?? [];

const initialCartData = getItem<CartData>('REGISTERED_CART') ?? null;

const initialState: CartState = {
  cartItems: initialCartItems,
  cartData: initialCartData,
  newOrder: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartData: (state, action: PayloadAction<null>) => {
      setItem('REGISTERED_CART', action.payload);
      state.cartData = action.payload;
    },
    setCartItems: (state, action: PayloadAction<Array<any>>) => {
      state.cartItems = action.payload.map((item) => ({
        ...item,
        buyCount: item.buyCount,
      }));
      setItem('CART_ITEMS', state.cartItems);
    },

    resetCart: (state) => {
      state.cartItems = [];
      state.cartData = null;
      removeItem('REGISTERED_CART');
      removeItem('CART_ITEMS');
    },
    addToCart: (state, action: PayloadAction<Item & { buyCount: number }>) => {
      const cartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (cartItemIndex === -1) {
        state.cartItems.push({
          id: action.payload.id,
          price: action.payload.price,
          name: action.payload.name,
          image: action.payload.banner,
          quantity: action.payload.quantity,
          buyCount: action.payload.buyCount,
        });
        setItem('CART_ITEMS', state.cartItems);
        return;
      }
      state.cartItems[cartItemIndex].buyCount += action.payload.buyCount;
      setItem('CART_ITEMS', state.cartItems);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      setItem('CART_ITEMS', state.cartItems);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const cartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems[cartItemIndex].buyCount += 1;
      setItem('CART_ITEMS', state.cartItems);
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const cartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (state.cartItems[cartItemIndex].buyCount <= 1) {
        state.cartItems[cartItemIndex].buyCount = 1;
        setItem('CART_ITEMS', state.cartItems);
        return;
      }
      state.cartItems[cartItemIndex].buyCount -= 1;
      setItem('CART_ITEMS', state.cartItems);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  resetCart,
  setCartData,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
