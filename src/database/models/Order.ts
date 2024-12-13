import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    PrimaryKey,
    AllowNull
    
} from 'sequelize-typescript'

@Table({
    tableName : 'orders', 
    modelName : 'Order', 
    timestamps : true
})

class Order extends Model{
    @Column({
        primaryKey : true,
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4,


    })
    declare id : string

    @Column({
        type : DataType.STRING,
        allowNull : false,
        validate : {
            len : {
                args : [10,10],
                msg : 'phoneNumber should be of 10 digit'
            }
        }
        
    })
    declare phoneNumber : string

    @Column({
        type : DataType.STRING,
        allowNull : false
        
    })
    declare shippingAddress : string

    @Column({
        type : DataType.FLOAT,
        allowNull : false
        
    })
    declare totalAmount : number

    @Column({
        type : DataType.ENUM('pending','cancelled','delivered','ontheway','preparation'),
        defaultValue : 'pending',
        allowNull : false
        
    })
    declare orderStatus : string

    

    
}

export default Order