import { ForeignKey, Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv';
import Product from './models/Product';
import User from './models/userModel';
import Category from './models/Category';
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



export default sequelize
