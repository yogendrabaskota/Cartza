import { Request, Response } from "express"
import Product from "../database/models/Product"

// interface MulterRequest extends Request {
//     file?: Express.Multer.File; // Add multer's file type
//   }


class ProductController{
    async addProduct(req:Request, res:Response):Promise<void>{
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
        productImageUrl : fileName
       })
       res.status(200).json({
        message : "Product added successfully"
       })
    }
}

export default new ProductController()