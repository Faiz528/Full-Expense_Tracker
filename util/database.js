const Sequelize = require('sequelize')
const sequelize = new Sequelize('Expense_tracker','root','Gate@2022',{
    dialect : 'mysql',
    host :'localhost'
})

module.exports = sequelize