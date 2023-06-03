const User = require('../../model/user')
const bcrypt = require('bcrypt')
exports.VerifyUser= async(req,res,next)=>{
  try {
    const { email, pass } = req.body; // Destructure email and pass from req.body
    console.log(req.body);

    const user = await User.findOne({ where: { Email: email } });
    console.log(user);
     
    if (!user) {
      return res.status(404).json("User not found"); // User not found, return null
    } else {
      bcrypt.compare(pass , user.Password,(err,result)=>{
        if(err)
        res.status(500).json("Something went wrong")
      
      if (result== true) {
        return res.status(200).json({message:"Logged in Successfully"});
      } else {
        return res.status(401).json("User not authorised");
      }
    })
    }
  }
  catch(err){
    console.log(err)
  }
} 
//
