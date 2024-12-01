import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Cart from "../database/models/Cart";
import Product from "../database/models/Product";
import Category from "../database/models/Category";


// interface CartData {
//     id : string | null,
//     quantity : number | null,
//     createdAt : string | null,
//     updatedAt : string | null,    
//     userId : string | null,
//     productId : string | null

// }

class CartController{
    async addToCart(req:AuthRequest, res:Response):Promise<void>{
        const userId = req.user?.id
        console.log("user id",userId)
        const {quantity, productId} = req.body

        if(!quantity || !productId){
            res.status(400).json({
                message : "Please provide quantity, productId"
            })
            return
        }
        let cartItem = await Cart.findOne({
            where : {
                productId:productId,
                userId:userId
            }
        })
        if(cartItem){
            cartItem.quantity += quantity
            await cartItem.save()
            

        }else {
               cartItem = await Cart.create({
                quantity,
                userId,
                productId
            })
            
        }
        res.status(200).json({
            message : "Item added to cart successfully",
            data : cartItem
        })
    }

    async getMyCart(req:AuthRequest, res:Response):Promise<void>{
        const userId = req.user?.id
        const datas = await Cart.findAll({
            where : {
                userId 
            },
            include : [
                {
                    model :Product,
                    attributes : ['productName','productDescription','productImageUrl'],
                   include : [
                    {
                        model : Category,
                        attributes : ['id','categoryName']
                    }
                   ]

                
            }
        ],
        attributes : ['productId','quantity']
        })
        
        if(datas.length == 0){
            res.status(404).json({
                message : "No cart found"
            })
        }else{
            res.status(200).json({
                message : "Cart Fetched Successfully",
                data : datas
            })

        }
    }

    async deleteMyCartItem(req:AuthRequest, res:Response):Promise<void>{
        const userId = req.user?.id
        const {productId} = req.params

        const product = await Product.findByPk(productId)
        if(!product){
            res.status(404).json({
                message : "Invalid/Empty Product Id"
            })
            return
        }
        // ddelete from cart
        await Cart.destroy({
            where : {
                userId,
                productId
            }
        })
        res.status(200).json({
            message : "Item removed Successfully"
        })

    }

    async updateCartItem(req:AuthRequest, res:Response):Promise<void>{
        const {productId} = req.params
        const userId = req.user?.id 
        const {quantity} = req.body
        if(!quantity){
            res.status(400).json({
                message : "Please Provide quantity"
            })
            return
        }
        const cartData :Cart | null = await Cart.findOne({
            where : {
                userId,
                productId
            }
        })
        if(cartData){
            cartData.quantity = quantity
        
            await cartData?.save()
            res.status(200).json({
                message : "Cart updated Successfully",
                data : cartData
            })
        }else{
            res.status(404).json({
                message : "opps!! Something went wrong"
            })
        }
        
    }

}

export default new CartController()