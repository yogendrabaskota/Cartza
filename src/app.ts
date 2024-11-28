import express,{Application, Request, Response} from 'express'
import * as dotenv from 'dotenv'
import './database/connection'
import adminSeeder from './adminSeeder'

dotenv.config()


const app:Application = express()
const PORT:number = 3000
dotenv.config()
app.use(express.json())  

//admin seeder
adminSeeder()



import userRoute from './routes/userRoute'
import productRoute from './routes/productRoute'
import categoryController from './controllers/categoryController'


app.use("/",userRoute)
app.use("/admin/product",productRoute)






app.get("/",(req:Request,res:Response)=>{
    res.send("hello world")
})

app.listen(PORT,()=>{
    categoryController.seedCategory()
    console.log("server has started at port ", PORT)
})
