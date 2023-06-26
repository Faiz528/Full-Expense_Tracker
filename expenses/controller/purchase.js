const Order = require('../../model/order')
const User = require('../../model/user')
const Razorpay = require ('razorpay')


exports.Premium = (req,res,next)=>{
    try{
        console.log(process.env.Key_id)
        var rzp = new Razorpay({
            key_id : process.env.Key_id,
            key_secret :process.env.Key_secret
        })
        const amount = 75*100
    
        rzp.orders.create({amount , currency :"INR"}, (err,order)=>{
            if(err)
              throw new Error(JSON.stringify(err))

            req.user.createOrder({
                OrderId:order.id,
                status : "PENDING"
            }).then(()=>{
                return  res.status(201).json({order, key_id:rzp.key_id})

                }).catch(err=>{
                   throw new Error(err)
                })
        })
    }
        catch(err){
            console.log(err)
        }
            }
    exports.updateTransaction=async(req,res,next)=>{
        
        try{
            console.log('Everything fine')
            const{payment_id , order_id} = req.body
            const order = await Order.findOne({where:{OrderId : order_id}})
            await order.update({PaymentId : payment_id,status:'SUCCESSFULL'})
            console.log(req.user)
            await req.user.update({ispremium : 'true'})
            return res.status(200).json({success:true, message:"Transaction Successful"})
        }
        catch(err){
            console.log(err)
            res.status(403).json({errpr:err , message:'Something went wrong'})
        }
    }




