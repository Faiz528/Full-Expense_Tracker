const Expense = require("../../model/expense")
const jwt = require('jsonwebtoken')
const User = require('../../model/user')

exports.PostExpense = async (req, res, next) => {
  try {
    const { expense, purpose, category } = req.body
    const token = req.header('Authorisation')
    const userid = jwt.verify(token, 'secret').id
    console.log(userid)

    const result = await Expense.create({
      Expenses: expense,
      Purpose: purpose,
      Category: category,
      userId: userid
    })

    console.log(result)
    res.json(result)
  } catch (err) {
    console.log(err)
  }
}

exports.GetExpense = async (req, res, next) => {
    try {
      const token = req.header('Authorisation')
      console.log(token)
      const userid = jwt.verify(token, 'secret').id
      console.log(userid)
  
      const result = await Expense.findAll({ where: { userId: userid } })
      res.json(result)
    } catch (err) {
      console.log(err)
    }
}
exports.Getleader = async (req, res, next) => {
  try {
    const result = await User.findAll({
      order: [['Total', 'DESC']],
      attributes: ['Username', 'Total']
    })

    console.log(result)
    res.json(result)
  } catch (err) {
    console.log(err)
  }
}

exports.DeleteExpense = async (req, res, next) => {
  try {
    const user = await Expense.findByPk(req.params.id)
    const result = await user.destroy()
    res.json(result)
  } catch (err) {
    console.log(err)
  }
}

exports.EditExpense = async (req, res, next) => {
  try {
    const user = await Expense.findByPk(req.params.id)
    console.log("happy")
    res.json(user)
  } catch (err) {
    console.log(err)
  }
}

exports.UpdateExpense = async (req, res, next) => {
  try {
    console.log(req.body)
    const data = await Expense.findByPk(req.params.id)
    data.set({
      Expenses: req.body.expense,
      Purpose: req.body.purpose,
      Category: req.body.category
    })
    await data.save()
    res.json(data)
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

exports.Gettotal = async (req, res, next) => {
  try {
    const total = req.params.sum
    const a = await req.user.update({ Total: total })
    res.json(a)
  } catch (err) {
    console.log(err)
  }
}
