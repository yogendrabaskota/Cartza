import Category from "../database/models/Category"
import { Request, Response } from "express"



class CategoryController{
    categoryData=[ 
        {
        categoryName : "Electronics"
        },
        {
            categoryName : 'Groceries'
        },
        {
            categoryName : 'Food/Beverages'
        }

    ]


    async seedCategory():Promise<void>{

        const datas = await Category.findAll()
        if(datas.length === 0){
            const data = await Category.bulkCreate(this.categoryData)
            console.log("Categories seeded successfully")

        }
        else{
            console.log("Categories already seeded")
        }


    }

    async addCategory(req:Request, res:Response):Promise<void>{
        const {categoryName} = req.body
        if(!categoryName){
            res.status(400).json({
                message: "Please provide Category Name"
            })
            return
        }
        const data = await Category.create ({
            categoryName
        })
        res.status(200).json({
            message : "Category Added Successfully",
            data
        })
    }

    async getCategories(req:Request, res:Response){
        const data = await Category.findAll()
      //  console.log("datas",data)
        res.status(200).json({
            message : "Categories fetched Successfully",
            data
        })
    }

    async updateCategory(req:Request, res:Response):Promise<void>{
        const {id} = req.params
        const {categoryName} = req.body
        const data = await Category.update({categoryName},
            {
                where : {
                    id
                }
            })
            res.status(200).json({
                message : "Category Uppdated Successfully",
                
            })

    }

    async deleteCategory(req:Request, res:Response):Promise<void>{
        const id = req.params.id
        const data = await Category.findAll({
            where : {
                id : id
            }
        })
        if(data.length == 0){
            res.status(404).json({
                message : "No Category Found "
            })
            return 
        }
        await Category.destroy({
            where : {
                id
            }    
        })
        res.status(200).json({
            message : "Category deleated Successfully"
        })

    }


}

export default new CategoryController()