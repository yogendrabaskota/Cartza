import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItems, cartState } from "../globals/types/cartTypes";
import { Status } from "../globals/types/types";
import { AppDispatch } from "./store";
import { APIAuth } from "../http";


const initialState : cartState={
    items : [],
    status :Status.LOADING
}

const cartSlice = createSlice ({
    name : 'cart',
    initialState : initialState,
    reducers : {
        setItems(state : cartState,action:PayloadAction<CartItems[]>){
            state.items = action.payload
        },
        setStatus(state:cartState,action:PayloadAction<Status>){
            state.status = action.payload
        }   
    }
})

export const {setItems,setStatus} = cartSlice.actions
export default cartSlice.reducer  


export function addToCart(productId: string) {
  return async function addToCartThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuth.post("/user/cart", {
        productId,
        quantity: 1,
      });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}