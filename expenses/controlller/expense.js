const Expense = require("../../model/expense")
//const User = require('../models/user')
exports.PostExpense= (req,res,next)=>{

    const amounts = req.body.expense
    const purposes = req.body.purpose
    const categorys = req.body.category
     
    
    Expense.create({
        Expenses : amounts,
        Purpose : purposes,
        Category : categorys
    })
    .then(result=>{
        console.log(result)
        res.json(result)
    }).catch(err=>{
        console.log(err)
    })
}

exports.GetExpense= (req,res,next)=>{
    Expense.findAll().then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err)
    })
}



exports.DeleteExpense= (req,res,next)=>{
    Expense.findByPk(req.params.id).then(user=>{
       return user.destroy()
    }).then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err)
    })
}

exports.EditExpense = (req,res,next)=>{
    
    Expense.findByPk(req.params.id).then(user=>{
        console.log("happy")
         res.json(user)
    }).catch(err=>{
        console.log(err)
    })
}

exports.UpdateExpense= (req,res,next)=>{
    console.log(req.body)
    Expense.findByPk(req.params.id).then(data=>{
        data.set({
            Expenses:req.body.expense,
            Purpose : req.body.purpose,
            Category : req.body.category
        })
        data.save()
    })
   
    .then(result=>{
        res.json(result)
        console.log(result)
    }).catch(err=>{
        console.log(err)
    })
   
}

exports.GetUser=(req,res,next)=>{
     User.findByPk(1).then(user=>{
        console.log(user)
        res.json(user)
     }).catch(err=>{
        console.log(err)
     })
}