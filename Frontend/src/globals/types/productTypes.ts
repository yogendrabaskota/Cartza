import { Status } from "./types";

export interface Product{
    id : string,
    productName : string
    productDescription : string,
    productPrice : number,
    productTotalStockQty : string,
    productImageUrl : string,
    createdAt : string,
    userId : UserId,
    categoryId : Category,
    Category : Category
}

interface UserId{
    id : string,
    email : string,
    username : string
}
interface Category {
    id : string,
    categoryName : string 
}

export interface ProductState {
  product: Product[],
  status: Status,
  singleProduct : Product | null
}