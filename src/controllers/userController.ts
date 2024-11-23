import {Request, Response} from 'express'
import User from '../database/models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


class AuthController {
  public static async registeruser(req:Request,res:Response):Promise<void>{

        const {username,email,password, role} = req.body

        if(!username || !email || !password){
            res.status(400).json({
                message : "Please provide username, email and password"
            })
            return
        } 
        await User.create({
            username,
            role,
            email,
            password : bcrypt.hashSync(password,8)
        })
        res.status(200).json({
            message : "User registered successfully"
        })
    }

    public static async loginUser(req:Request, res:Response):Promise<void>{
        const {email , password} = req.body
        if(!email || !password){
            res.status(400).json({
                message:"Please provide email and password"
            })
            return
        }
        const [data] = await User.findAll({
            where : {
                email : email
            }
        })
       // console.log(data)
       if(!data){
        res.status(404).json({
            message : "No user with this email"
        })
        return
       }
       const isMatched = bcrypt.compareSync(password,data.password) // true or false
       if(isMatched){
        const token = jwt.sign({id:data.id},"process.env.SECRET_KEY",{
            expiresIn : "20d"
        })
        

        res.status(200).json({
            message : "Logged In successfully",
            data : token

        })


       }else{
        res.status(403).json({
            message : "Invalid password"
        })
       }
    }
}

export default AuthController