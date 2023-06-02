const express= require('express')
const route = express.Router()

const Expense = require('../control/sign')

route.post('/signup' , Expense.PostUser)

module.exports = route