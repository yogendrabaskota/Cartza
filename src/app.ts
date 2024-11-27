import express,{Application, Request, Response} from 'express'
import * as dotenv from 'dotenv'
import './database/connection'
import adminSeeder from './adminSseeder'

dotenv.config()


const app:Application = express()
const PORT:number = 3000
dotenv.config()
app.use(express.json())  

//admin seeder
adminSeeder()


import userRoute from './routes/userRoute'
import productRoute from './routes/productRoute'


app.use("/",userRoute)
app.use("/admin/product",productRoute)






app.get("/",(req:Request,res:Response)=>{
    res.send("hello world")
})

app.listen(PORT,()=>{
    console.log("server has started at port ", PORT)
})
