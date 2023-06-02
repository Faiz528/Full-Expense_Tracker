const express = require('express')
const app = express()
const Parser = require('body-parser')

const sequelize = require('./util/database')
const cors = require('cors')



app.use(cors())
app.use(Parser.json({extended:false}))

const Signup = require('./sign up/route/sign')
app.use(Signup)
const Login = require('./login/route/log')
app.use(Login)

sequelize.
sync().then(result=>{
  app.listen(3000)
}).catch(err=>{
    console.log(err)
})
