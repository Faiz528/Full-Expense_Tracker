const  Sequelize  = require('sequelize')
const db = require('../util/database')
const sequelize = require('../util/database')
const Expense = sequelize.define('expenditure',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Username:{
         type : Sequelize.STRING,
         allowNull : false,
         unique : true
    },
    Email :{
        type:Sequelize.STRING,
        allowNull : false
    },
    Password : {
        type :Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Expense