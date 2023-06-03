const express = require('express')

const route = express.Router()

const Control = require('../controlller/expense')

route.post('/add',Control.PostExpense)

route.get('/user', Control.GetUser)

route.post('/edits/:id',Control.UpdateExpense)

route.get('/add' ,Control.GetExpense )

route.get('/edit/:id',Control.EditExpense)

route.delete('/delete/:id',Control.DeleteExpense)


module.exports = route