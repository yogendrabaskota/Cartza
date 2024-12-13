import { ForeignKey, Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv';
import Product from './models/Product';
import User from './models/userModel';
import Category from './models/Category';
import Cart from './models/Cart';
import Order from './models/Order';
import OrderDetail from './models/OrderDetails';
import Payment from './models/Payment';
dotenv.config()

const sequelize = new Sequelize({
    database : process.env.DB_NAME,
    dialect : 'mysql',
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    
    host : process.env.DB_HOST,
    port : Number(process.env.DB_PORT), 
    models : [__dirname + "/models"]

})
sequelize.authenticate()
.then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log(err)
})

sequelize.sync({force : false}).then(()=>{
    console.log("Synced")
})
// Relationship
User.hasMany(Product, {foreignKey : 'userId' })
Product.belongsTo(User, {foreignKey : 'userId'} )

Category.hasOne(Product, {foreignKey : 'categoryId'})
Product.belongsTo(Category, {foreignKey : 'categoryId'})

Product.hasMany(Cart, {foreignKey : 'productId'})
Cart.belongsTo(Product, {foreignKey : 'productId'})

User.hasMany(Cart, {foreignKey : 'userId'})
Cart.belongsTo(User, {foreignKey : 'userId'})


//Order and OrderDetails relation
Order.hasMany(OrderDetail,{foreignKey : 'orderId'})
OrderDetail.belongsTo(Order,{foreignKey : 'orderId'})

Product.hasMany(OrderDetail,{foreignKey : 'productId'})
OrderDetail.belongsTo(Product,{foreignKey : 'productId'})

Payment.hasOne(Order,{foreignKey : 'paymentId'})
Order.belongsTo(Payment,{foreignKey : 'paymentId'})

User.hasMany(Order,{foreignKey : 'userId'})
Order.belongsTo(User,{foreignKey : 'userId'})



export default sequelize
