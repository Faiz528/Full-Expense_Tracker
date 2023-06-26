const Expense = require("../../model/expense")
const jwt = require('jsonwebtoken')
const User = require('../../model/user')
const Downloaded = require('../../model/download')
const AWS = require('aws-sdk')

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
  
      const result = await Expense.findAll({ where: { userId: req.user.id} })
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
exports.Download = async (req,res,next)=>{
  try{
  const load = await Expense.findAll({ where: { userId: req.user.id} })
  console.log(load)
  const userId =req.user.id
  const Stringify = JSON.stringify(load)
  const fileName =`Expense${userId}/${new Date()}.txt`
  const fileUrl = await uploadToS3(Stringify,fileName)
  console.log(fileUrl)
  const result = await Downloaded.create({userId:userId,file:fileUrl})
  res.status(200).json({fileUrl,success:true})
}
catch(err){
  console.log(err)
  res.status(500).json({fileUrl:'', success:false , err:err})
}
}
function uploadToS3(data,filename)
{
  const BUCKET_NAME='expensestracker1'
  const IAM_USER_KEY ='AKIA344RLU5CUDYOIU5G'
  const IAM_USER_SECRET='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'

  let s3bucket = new AWS.S3({
    accessKeyId : IAM_USER_KEY,
    secretAccessKey : IAM_USER_SECRET,
    
  })
  
    var params ={
      Bucket : BUCKET_NAME,
      Key: filename,
      Body:data,
      ACL:'public-read'
    }
    return new Promise((resolve,reject)=>{

      s3bucket.upload(params,(err,s3response)=> {
        if(err)
        console.log(err)
        else{
        console.log('success',s3response)
        resolve(s3response.Location)
        }
      })

    })
   
}
 exports.downloadFile = async(req,res,next)=>{
  console.log(req.user.id)
  const files = await Downloaded.findAll({ where: { userId: req.user.id} })
      console.log(files)
      res.json(files)
 }

 /*exports.getPageData = async (req, res, next) => { 
  const itemsPerPage = parseInt(req.header("itemsPerPage")) 
  // console.log('itemsPerPAGE>>>>>', typeof itemsPerPage) 
  const ITEMS_PER_PAGE = itemsPerPage; 
  const page = +req.params.page || 1; 
  let totalItems; 
 
  try { 
    totalItems = await Expense.count({ where: { userId: req.user.id } }); 
    const expenses = await Expense.findAll({ 
      where: { userId: req.user.id }, 
      offset: (page - 1) * ITEMS_PER_PAGE, 
      limit: ITEMS_PER_PAGE, 
    }); 
 
    const pageData = { 
      currentPage: page, 
      hasNextPage: ITEMS_PER_PAGE * page < totalItems, 
      hasPreviousPage: page > 1, 
      nextPage: page + 1, 
      previousPage: page - 1, 
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE), 
    }; 
 
    res.json({ expenses, pageData }); 
  } catch (err) { 
    console.log(err); 
    next(err); 
  } 
};*/

exports.getpage= async(req,res)=>{
  const page = parseInt(req.query.page)
  const size = parseInt(req.query.limit)

  const startIndex = (page-1)*size
  const lastIndex = page*size
  
  
  const users = await Expense.findAndCountAll(
    {where:{userId:req.user.id},
    limit:size,
    offset : (page-1)*size
  })

  console.log(users)
  res.json(users)
  const result ={}
}