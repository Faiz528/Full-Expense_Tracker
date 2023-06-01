const Expense = require('../model/expense')
exports.PostUser=(req,res,next)=>{
 var name = req.body.name
  /*const find =(Expense.findOne({where:{ Username :name}}))
  if(find)
  {
    res.status(404).send("User Already Exist")
  }
  else{*/

  Expense.create({
    Username : name,
    Email : req.body.email,
    Password : req.body.pass
  }).then(user=>{
    res.json(user)
    
  }).catch(err=>{
    res.json(err)
    console.log(err)
  })
  }
//