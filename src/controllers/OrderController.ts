import { AuthRequest } from "../middleware/authMiddleware";
import { Response } from "express";
import { KhaltiResponse, OrderData, PaymentMethod, TransactionStatus, TransactionVerificationResponse } from "../types/orderTypes";
import Order from "../database/models/Order";
import Payment from "../database/models/Payment";
import OrderDetail from "../database/models/OrderDetails";
import axios from "axios";
import Product from "../database/models/Product";

class OrderController{
    async createOrder(req:AuthRequest, res:Response):Promise <void>{

        const userId = req.user?.id
        const {phoneNumber, shippingAddress, totalAmount,paymentDetails, items} : OrderData = req.body

        if(!phoneNumber || !shippingAddress || !totalAmount || !paymentDetails || !paymentDetails.paymentMethod || items.length == 0){
            res.status(400).json({
                message : "Please provide phoneNumber, shippingAddress, totalAmount,paymentDetails, items"

            })
            return
        }
        

        const paymentData = await Payment.create({
            paymentMethod : paymentDetails.paymentMethod
        })
        const orderData = await Order.create({
            phoneNumber,
            shippingAddress,
            totalAmount,
            userId,
            paymentId : paymentData.id
        })
        
        for(var i = 0; i<items.length ; i++){
            await OrderDetail.create({
                quantity : items[i].quantity,
                productId : items[i].productId,
                orderId : orderData.id
            })
        }
        if(paymentDetails.paymentMethod === PaymentMethod.Khalti){
            // Khalti Integration Here
            const data = {
                return_url : "http://localhost:3000/success",
                purchase_order_id : orderData.id,
                amount : totalAmount * 100,
                website_url : "http://localhost:3000/",
                purchase_order_name : 'orderName_' + orderData.id
            }
            const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/',data,{
                headers : {
                    'Authorization' : 'key 1bede2f3815e47eb98a472675e017104'
                }
            })
            const khaltiResponse:KhaltiResponse = response.data
            paymentData.pidx = khaltiResponse.pidx
            paymentData.save()
            res.status(200).json({
                message : "Order placed successfully",
                url : khaltiResponse.payment_url
            })


        }else{
            res.status(200).json({
                message : "Order Placed Successfully"
            })
        }



    }

    async verifyTransaction(req:AuthRequest,res:Response):Promise<void>{
        const {pidx} = req.body
        //const userId = req.user?.id
        if(!pidx){
            res.status(400).json({
                message : "Please provide pidx"
            })
            return
        }
        const response = await axios.post("https://a.khalti.com/api/v2/epayment/lookup/",{pidx},{
            headers : {
                'Authorization' : 'key 1bede2f3815e47eb98a472675e017104'
            }
        })
        const data:TransactionVerificationResponse = response.data
        //console.log("data ",data)
        if(data.status === TransactionStatus.Completed){
            await Payment.update({paymentStatus:'paid'},{
                where : {
                    pidx : pidx
                }
            })
            res.status(200).json({
                message : "Payment verified successfully"
            })
            //console.log("order here ",order)
        }else{
            res.status(200).json({
                message : "Payment not verified"
            })
        }
    }

    async fetchMyOrders(req:AuthRequest, res:Response):Promise<void>{
        const userId = req.user?.id
        const orders = await Order.findAll({
            where : {
                userId 
            },
            include : [
                {
                    model : Payment
                }
            ]
        })
        if(orders.length > 0) {
            res.status(200).json({
            message : "Orders fetched successfully",
            data : orders
            })

        }else {
            res.status(404).json({
                message : "No orders found",
                data : []
            })
        }

    }

    async fetchOrderDetails(req:AuthRequest,res:Response):Promise<void>{
      
        const orderId = req.params.id 
        const orderDetails = await OrderDetail.findAll({
            where : {
                orderId

            },
            include : [
                {
                    model : Product
                }
            ]
        })
        if(orderDetails.length > 0){
            res.status(200).json({
                message : "OrderDetails fetched ",
                data : orderDetails
            })
        }else{
            res.status(404).json({
                message : "No any orderDetails with that id",
                data : []
            })
        }
    }

    async cancelMyOrder(req:AuthRequest,res:Response):Promise<void>{
        const userId = req.user?.id
        const orderId = req.params.id
    }

}

export default new OrderController()