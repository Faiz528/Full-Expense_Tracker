const express = require('express')
const authenticates = require('../../middleware/auth.js')
const route = express.Router()

const Control = require('../controlller/expense')
const Premium = require('../controlller/purchase')
route.post('/add',Control.PostExpense)
route.get('/leaderlist',Control.Getleader)
route.get('/premium',authenticates.authenticate, Premium.Premium)
route.post('/updatetransactionstatus',authenticates.authenticate, Premium.updateTransaction)

route.post('/edits/:id',Control.UpdateExpense)

route.get('/add' ,Control.GetExpense )

route.get('/edit/:id',Control.EditExpense)

route.delete('/delete/:id',Control.DeleteExpense)
route.get('/totals/:sum',authenticates.authenticate,Control.Gettotal)

module.exports = route
