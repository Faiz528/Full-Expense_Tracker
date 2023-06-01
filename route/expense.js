const express= require('express')
const route = express.Router()

const Expense = require('../control/expense')

route.post('/login' , Expense.PostUser)

module.exports = route