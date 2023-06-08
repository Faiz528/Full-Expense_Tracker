const sequelize = require('../util/database')
const  Sequelize  = require('sequelize')
const Order = sequelize.define('order',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    OrderId:{
         type : Sequelize.STRING,
        
    
    },
    PaymentId :{
        type: Sequelize.STRING
    },
    
    
     status : {
        type :Sequelize.STRING,

    }
})

module.exports = Order