const User = require('../../model/user')

exports.VerifyUser= async(req,res,next)=>{
  try {
    const { email, pass } = req.body; // Destructure email and pass from req.body
    console.log(req.body);

    const user = await User.findOne({ where: { Email: email } });
    console.log(user);

    if (!user) {
      return res.status(404).json("User not found"); // User not found, return null
    } else {
      if (user.Password !== pass) {
        return res.status(401).json("User not authorised");
      } else {
        return res.status(200).json(user);
      }
    }
  }
  catch(err){
    console.log(err)
  }
} 
//
