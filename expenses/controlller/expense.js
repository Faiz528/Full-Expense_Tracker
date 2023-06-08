const Expense = require("../../model/expense")
const jwt = require('jsonwebtoken')
const User = require('../../model/user')

exports.PostExpense= (req,res,next)=>{
     
    const{expense , purpose , category , id} = req.body
    const token = req.header('Authorisation')
    const userid = jwt.verify(token,'secret').id
     console.log(id)
    
    Expense.create({
        Expenses : expense,
        Purpose : purpose,
        Category : category,
        userId   : userid
    })
    .then(result=>{
        console.log(result)
        res.json(result)
    }).catch(err=>{
        console.log(err)
    })
}

exports.GetExpense= (req,res,next)=>{
    const token = req.header('Authorisation')
    console.log(token)
    const userid = jwt.verify(token,'secret').id
    console.log(userid)
    Expense.findAll({where :{userId:userid}}).then(result=>{
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

