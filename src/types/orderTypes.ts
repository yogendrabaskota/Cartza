
export interface OrderData {
    phoneNumber : string,
    shippingAddress : string,
    totalAmount : number,
    paymentDetails : {
        paymentMethod : PaymentMethod,
        paymentStatus? : PaymentStatus, // ? in here shows it is optional
        pidx? : string
    },
    items : OrderDetails[]
}


export interface OrderDetails{
    quantity : number,
    productId : string
}

export enum PaymentMethod{
    Cod = 'cod',
    Khalti = 'khalti'
}

enum PaymentStatus {
    Paid = 'paid',
    Unpaid = 'unpaid'
}

export interface KhaltiResponse {
    pidx : string,
    payment_url : string,
    expires_at : Date | string,
    expires_in : number
   // user_fee : number
}

export interface TransactionVerificationResponse {
    pidx : string,
    total_amount : number,
    status : TransactionStatus,
    transaction_id : string,
    fee : number, 
    refunded : boolean
}

enum TransactionStatus {
    Completed = 'completed',
    Refunded = 'refunded',
    Pending = 'pending',
    Initiated = 'initiated'
}
