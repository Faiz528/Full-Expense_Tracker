const express= require('express')
const route = express.Router()

const Login = require('../control/log')

route.post('/login' , Login.VerifyUser)

module.exports = route