import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItems, cartState } from "../globals/types/cartTypes";
import { Status } from "../globals/types/types";
import { AppDispatch } from "./store";
import { APIAuth } from "../http";


const initialState : cartState={
    items : [],
    status :Status.LOADING

}
interface DeleteAction{
  productId : string
}
interface UpdateAction extends DeleteAction{
  quantity : number

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
        },
        setDeleteItem(state:cartState,action:PayloadAction<DeleteAction>){
          const index = state.items.findIndex(item=>item.Product.id = action.payload.productId)
          state.items.splice(index,1)
        },
        setUpdateItem(state : cartState,action:PayloadAction<UpdateAction>){
          const index = state.items.findIndex(item=>item.Product.id = action.payload.productId)
          if(index !== -1){
            state.items[index].quantity = action.payload.quantity
          }
       
        }
    }
})

export const {setItems,setStatus,setDeleteItem,setUpdateItem} = cartSlice.actions
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
  }
}

export function fetchCartItems(){
  return async function fetchCartItemsThunk(dispatch:AppDispatch) {
    dispatch(setStatus(Status.LOADING))
    try {
      const response = await APIAuth.get('/user/cart')
      if(response.status === 200){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(setItems(response.data.data))
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR))
      console.log(error)
      
    } 
  }
}

export function DeleteCartItems(productId : string){
  return async function DeleteCartItemsThunk(dispatch:AppDispatch) {
    dispatch(setStatus(Status.LOADING))
    try {
      const response = await APIAuth.delete('/user/cart/' + productId)
      if(response.status === 200){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(setDeleteItem({productId}))
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR))
      console.log(error)
      
    } 
  }
}

export function UpdateCartItems(productId : string,quantity : number){
  return async function UpdateCartItemsThunk(dispatch:AppDispatch) {
    dispatch(setStatus(Status.LOADING))
    try {
      const response = await APIAuth.patch('/user/cart/' + productId,{
        quantity
      })
      if(response.status === 200){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(setUpdateItem({productId,quantity}))
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR))
      console.log(error)
      
    } 
  }
}