import { AuthRequest } from "../middleware/authMiddleware";
import { Response , Request} from "express";
import { KhaltiResponse, OrderData, OrderStatus, PaymentMethod, PaymentStatus, TransactionStatus, TransactionVerificationResponse } from "../types/orderTypes";
import Order from "../database/models/Order";
import Payment from "../database/models/Payment";
import OrderDetail from "../database/models/OrderDetails";
import axios from "axios";
import Product from "../database/models/Product";
import Cart from "../database/models/Cart";
import User from "../database/models/userModel";
import Category from "../database/models/Category";


class ExtendedOrder extends Order {
    declare paymentId : string | null
}


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

        let responseOrderData;
        
        for(var i = 0; i<items.length ; i++){
            responseOrderData = await OrderDetail.create({
                quantity : items[i].quantity,
                productId : items[i].productId,
                orderId : orderData.id
            })
            Cart.destroy({
                where : {
                    productId : items[i].productId,
                    userId : userId
                }
            })
        }
        if(paymentDetails.paymentMethod === PaymentMethod.Khalti){
            // Khalti Integration Here
            const data = {
                return_url : "http://localhost:5173/myorders",
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
                url : khaltiResponse.payment_url,
                data : responseOrderData
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


    //User side
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

    async fetchAllOrders(req:AuthRequest, res:Response):Promise<void>{

        const orders = await Order.findAll({
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
                    model : Product,
                    include : [
                        {
                            model : Category,
                            attributes : ['categoryName']
                        }
                    ]
                },{
                    model : Order,
                    include : [{
                        model : Payment,
                        attributes : ['paymentStatus', 'paymentMethod'],
                    },{
                        model : User,
                        attributes : ['username', 'email']
                    }]
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
        const order:any = await Order.findAll({
            where : {
                userId,
                id : orderId
            }
        })
        if(order?.orderStatus === OrderStatus.Ontheway || order?.OrderStatus.Preparation){
            res.status(200).json({
                message : "You cannot cancel the order when it is on the way or prepared"
            })
            return

        }
        await Order.update({OrderStatus : OrderStatus.Cancelled},{
            where : {
                id : orderId
            }
        })
            res.status(200).json({
                message : "Order cancelled successfully"
            })
        
    }


    // Admin side
    async changeOrderStatus(req:Request,res:Response):Promise<void>{
    
       const orderId = req.params.id 
       const orderStatus:OrderStatus = req.body.orderStatus
      //  const {orderStatus}:OrderStatus = req.body
        

        await Order.update({
            orderStatus : OrderStatus
        },{
            where : {
                id : orderId
            }
            
        })
        res.status(200).json({
            message : "Order status updated successfully"
        })
    }

    async changePaymentStatus(req:Request, res:Response):Promise<void> {
        const orderId = req.params.id;
        const order = await Order.findByPk(orderId)
        const paymentStatus: PaymentStatus = req.body.paymentStatus
        const extendedOrder : ExtendedOrder = order as ExtendedOrder
        await Payment.update({
            paymentStatus: paymentStatus
        },{
            where : {
                id : extendedOrder.paymentId
            }
        })
        res.status(200).json({
            message : `payment status of orderId${orderId} updated successfully to ${paymentStatus}`
        })
    }
    async deleteOrder(req:Request,res:Response):Promise<void>{
        const orderId = req.params.id
        const order = await Order.findByPk(orderId)
        const extendedOrder : ExtendedOrder = order as ExtendedOrder


        if(order){
     
        await OrderDetail.destroy({
            where : {
                orderId : orderId
            }
        })
        await Payment.destroy({
            where : {
                id : extendedOrder.paymentId
            }
        })

        await Order.destroy({
            where : {
                id : orderId
            }
        })
        res.status(200).json({
            message : "Order deleted successfully"
        })

        }else{
            res.status(400).json({
                message : "No order found with that orderId"
            })
        }

    }




}

export default new OrderController()