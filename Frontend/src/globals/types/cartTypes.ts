import { Product } from "./productTypes"
import { Status } from "./types"

export interface cartState {
    items : CartItems[],
    status : Status

}


export interface CartItems{
    product : Product,
    quantity : number
}