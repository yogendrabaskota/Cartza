
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