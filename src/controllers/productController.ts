import { Request, Response } from "express"
import Product from "../database/models/Product"
import { AuthRequest } from "../middleware/authMiddleware"
import User from "../database/models/userModel"
import Category from "../database/models/Category"



class ProductController{
    async addProduct(req:AuthRequest, res:Response):Promise<void>{
    const userId = req.user?.id
     const {productName, productDescription, productTotalStockQty, productPrice, categoryId}= req.body
     let fileName 
     if(req.file){
        fileName = req.file?.filename
     }else{
        fileName = "https://th.bing.com/th/id/OIP.wMnFO4BYfxu7EAiQaLP8ogHaHa?rs=1&pid=ImgDetMain"
     }

       if(!productName || !productDescription || !productTotalStockQty || !productPrice || !categoryId){
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
        userId,
        categoryId : categoryId

       })
       res.status(200).json({
        message : "Product added successfully"
       })
    }

    async getAllProduct(req:Request, res:Response):Promise<void>{

      const data = await Product.findAll(
         {
            include : [
               {
                  model : User,
                  attributes : ['id','username','email']
               },
               {
                  model : Category,
                  attributes : ['id','categoryName']
               }
            ]
         }
      )
      if(data.length == 0){
         res.status(404).json({
            message:"No product found",
            data
         })
         return
      }
      res.status(200).json({
         message:"Product fetched successfullt",
         data
      })

      
    }
}

export default new ProductController()