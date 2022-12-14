const express=require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {User} = require('../models/User');
const router = express.Router();

router.post('/add',async(req,res)=>{
    try{
        let {full_name,email,password} = req.body;
        /*Generate password hash*/
        const salt= await bcrypt.genSalt(10);
        password = await bcrypt.hash(password,salt);
        
        const user = new User({full_name,email,password})
        await user.save()
        return res.status(200).json({
            message:"user saved successfully",
            user
        })
    }catch(err){
        return res.status(500).json({
            message:"Something went wrong",
            error: err.message
        })
    }
})

router.post('/login',async(req,res)=>{
    try{
        const{email,password} = req.body;
        const user= await User.findOne({email:email});
        if(user){
            const verifyuser = await bcrypt.compare(password,user.password);
            if(verifyuser){
                const payload = {
                    user: {
                        id: user._id
                    }
                }
                const token = jwt.sign(payload,'siliconMERNCourse',{expiresIn:3600})

                res.status(200).json({
                    message: "Logged in",
                    user:{user_id:user._id,email:user.email}
                })            
            }else{
                res.status(400).json({
                    message: "Wrong Username/ Password"
                })
            }
        }else{
            res.status(400).json({
                message: "Wrong Username/ Password"
            })
        }
    }catch(err){
        res.status(500).send({
            message:"Something went wrong"
        })
    }
})

module.exports= router;