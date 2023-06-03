const User = require('../../model/user')
const bcrypt = require('bcrypt')
exports.PostUser=(req,res,next)=>{
  try{
 const{name , email, pass}= req.body
  bcrypt.hash(pass,10 , async(err,hash)=>{
    await  User.create({
      Username : name,
      Email : email,
      Password : hash
    })
  })

  }
  catch(err){
    console.log(err)
  }
}
