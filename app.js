require('dotenv').config();
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const Parser = require('body-parser')

const sequelize = require('./util/database')
const cors = require('cors')
const User = require('./model/user')
const Expenses = require('./model/expense')
const Order = require('./model/order')
const helmet = require('helmet')
const compressions = require('compression')
const morgan = require('morgan')

const accessLog = fs.createWriteStream(
  path.join(__dirname,'access.log'),{flags:'a'}
)
app.use(helmet())
app.use(compressions())
app.use(morgan('combined',{stream:accessLog}))

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
