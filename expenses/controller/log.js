const User = require('../../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.VerifyUser= async(req,res,next)=>{
  try {
    const { email, pass } = req.body; // Destructure email and pass from req.body
    console.log(req.body);

    const user = await User.findOne({ where: { Email: email } });
   // const id = user.id
    //console.log(id)
    //console.log(user);
     
    if (!user) {
      return res.status(404).json("User not found"); // User not found, return null
    } else {
      bcrypt.compare(pass , user.Password,(err,result)=>{
        if(err)
        res.status(500).json("Something went wrong")
        const id = user.id
      if (result== true) {
        const token = jwt.sign({id},'secret')
        return res.status(200).json({message :"Loogged in Succesfully" ,premium:user.ispremium , token:token})
      } else {
        return res.status(401).json("Password does not match");
      }
    })
    }
  }
  catch(err){
    console.log(err)
  }
} 


//