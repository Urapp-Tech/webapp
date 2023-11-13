import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getItem, setItem } from '../../utilities/local-storage';

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
  promoCode: string | null;
  status: string;
  tenant: string;
  totalAmount: string;
  updatedDate: string;
};
export interface CartState {
  cartItems: CartItem[];
  cartData: CartData | null;
  newOrder: [] | null;
}

const initialCartItems = getItem<CartItem[]>('CART_ITEMS') ?? [];

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
    addToCart: (state, action: PayloadAction<any>) => {
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
    incrementItemQuantity: (state, action: PayloadAction<string>) => {
      const cartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (
        state.cartItems[cartItemIndex].buyCount <
        state.cartItems[cartItemIndex].quantity
      ) {
        state.cartItems[cartItemIndex].buyCount += 1;
      }
      setItem('CART_ITEMS', state.cartItems);
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const cartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (state.cartItems[cartItemIndex].buyCount <= 0) {
        state.cartItems[cartItemIndex].buyCount = 0;
        setItem('CART_ITEMS', state.cartItems);
      }
      state.cartItems[cartItemIndex].buyCount -= 1;
      setItem('CART_ITEMS', state.cartItems);
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
  setCartData,
  newOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
