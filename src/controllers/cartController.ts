import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Cart from "../database/models/Cart";
import Product from "../database/models/Product";

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
                    attributes : ['id','productName']

                
            }
        ]
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

}

export default new CartController()