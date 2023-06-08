require('dotenv').config();
const express = require('express')
const app = express()
const Parser = require('body-parser')

const sequelize = require('./util/database')
const cors = require('cors')
const User = require('./model/user')
const Expenses = require('./model/expense')
const Order = require('./model/order')

app.use(cors())
app.use(Parser.json({extended:false}))

const Signup = require('./sign up/route/sign')
app.use(Signup)
const Login = require('./login/route/log')
app.use(Login)
const Expense = require('./expenses/route/expense')
app.use(Expense)



User.hasMany(Expenses)
Expenses.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)


sequelize.
sync().then(result=>{
  app.listen(3000)
}).catch(err=>{
    console.log(err)
})
