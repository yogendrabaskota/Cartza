import { Request, Response } from "express"
import Product from "../database/models/Product"
import { AuthRequest } from "../middleware/authMiddleware"



class ProductController{
    async addProduct(req:AuthRequest, res:Response):Promise<void>{
    const userId = req.user?.id
     const {productName, productDescription, productTotalStockQty, productPrice}= req.body
     let fileName 
     if(req.file){
        fileName = req.file?.filename
     }else{
        fileName = "https://th.bing.com/th/id/OIP.wMnFO4BYfxu7EAiQaLP8ogHaHa?rs=1&pid=ImgDetMain"
     }

       if(!productName || !productDescription || !productTotalStockQty || !productPrice){
        res.status(400).json({
            message : "Please provide productName, productDescription, productStock quantity, product price"
        })
        return
       }
       await Product.create({
        productName,
        productDescription,
        productTotalStockQty,
        productPrice,
        productImageUrl : fileName,
        userId
       })
       res.status(200).json({
        message : "Product added successfully"
       })
    }
}

export default new ProductController()