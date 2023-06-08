const jwt = require('jsonwebtoken')
const User = require('../model/user')
exports.authenticate = (req,res,next)=>{
    try{
        console.log("How is the day going")
        const token = req.header('Authorisation')
        const userid = jwt.verify(token,'secret').id
        User.findByPk(userid).then(user=>{
            console.log(JSON.stringify(user))
            req.user = user
            next()
        }).catch(err=>{throw new Error(err)})
    }
    catch(err){
        console.log(err)
        return res.status(401).json({succes:false})
    }
}