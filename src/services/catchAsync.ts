import { Request, Response } from "express"

const catchAsync = (fn:Function)=>{
    return (req:Request, res:Response,)=>{
        fn(req,res).catch((err:Error)=>{
            return res.status(500).json({
                message : "Internal Error",
                errorMessage : err.message
            })
        })
    }
}

export default catchAsync