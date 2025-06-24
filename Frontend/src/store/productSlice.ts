import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "../globals/types/productTypes";
import { Status } from "../globals/types/types";
import { AppDispatch, RootState } from "./store";
import API from "../http";

const initialState : ProductState ={
      product : [],
      status: Status.LOADING,
      singleProduct : null


}

const productSlice = createSlice({
    name : 'product',
    initialState : initialState,
    reducers : {
        setProduct(state : ProductState,action:PayloadAction<Product[]>){
            state.product = action.payload
        },
        setStatus(state : ProductState,action : PayloadAction<Status>){            
            state.status = action.payload
        },
                setSingleProduct(state : ProductState,action:PayloadAction<Product>){
            state.singleProduct = action.payload
        }

    }
}) 
export const {setProduct,setStatus,setSingleProduct} = productSlice.actions
export default productSlice.reducer

export function fetchProduct(){
    return async function getProductThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await API.get('admin/product')
            if(response.status === 200){
                const {data} = response.data
                dispatch(setProduct(data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}


export function fetchByproductId(productId: string){
    return async function fetchByProductIdThunk(dispatch:AppDispatch,getState : ()=>RootState) {

        const state = getState()
        const existingProduct = state.products.product.find((product:Product)=>product.id == productId)
        if(existingProduct){
            dispatch(setSingleProduct(existingProduct))
            dispatch(setStatus(Status.SUCCESS))
        }
        else{
             try {
            const response = await API.get(`admin/product/${productId}`)
            if(response.status === 200){
                const {data} = response.data
                dispatch(setSingleProduct(data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }

        }
    }
}