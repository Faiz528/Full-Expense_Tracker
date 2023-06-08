const  Sequelize  = require('sequelize')
const db = require('../util/database')
const sequelize = require('../util/database')
const User = sequelize.define('user',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Username:{
         type : Sequelize.STRING,
         allowNull : false,
    
    },
    ispremium:{type: Sequelize.BOOLEAN},
    Email :{
        type:Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    Password : {
        type :Sequelize.STRING,
        allowNull:false
    }
})

module.exports = User