import {Sequelize, DataType} from "sequelize";
import dbConfig from "../config/dbConfig";


const sequelize = new Sequelize(dbConfig.db,dbConfig.user,dbConfig.password,{
    host : dbConfig.host,
    dialect : dbConfig.dialect,
    port : 3306,
    pool : {
        acquire : dbConfig.pool.acquire,
        min : dbConfig.pool.min,
        idle : dbConfig.pool.idle
    }
})

sequelize
.authenticate()
.then(()=>{
    console.log("connected")
})
.catch(()=>{
    console.log("Error")
})

const db:any = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.sequelize.sync({force : false}).then(()=>{
    console.log("Yes Migrated")
})
export default db
