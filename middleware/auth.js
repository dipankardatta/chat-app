const jwt = require('jsonwebtoken')
const User =require('../models/user')

exports.authenticate = (req,res,next)=>{
    try{
        const token = req.header('authorization')
        const user = jwt.verify('secretkey')
        // console.log(user.userId)
        User.findByPk(user.userId).then(user=>{
            req.user=user
            next();
        })
    }
    catch(err){
        console.log(err)
        return res.status(401).json({success:'Not authenticated'})
    }
}


