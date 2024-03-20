const express=require('express')
const userRouter=express.Router()
const {UserModel}=require('../model/user.model')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

userRouter.get('/',(req,res)=>{
    res.send('user data')
})

userRouter.post('/register',async(req,res)=>{
    const {name,email,password,address:{street,city,state,country,zip}} =req.body
    try{
        const userExist=await UserModel.findOne({email})
        if(userExist)
        {
            res.status(200).json({msg:"user already exist, login please"})
        }else{
            const hash=await bcrypt.hash(password,5)
            const user=new UserModel({name,email,password:hash,address:{street,city,state,country,zip}})
            await user.save()
            res.status(201).json({msg:'user has been registered successfully'})
        }
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.findOne({email})
        if(user)
        {  const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const token = jwt.sign({ userID: user._id,role:user.role }, "masai");
                res.status(201).json({ message: 'Login successful', token });
            } else {
                res.status(401).json({ error: 'Invalid email or password' });
            }
        }else{
            res.status(201).json({msg:"user doesnt exist, please register"})
        }
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})

userRouter.patch('/:id/reset',async(req,res)=>{
    const _id=req.params.id
    const {oldpassword,newpassword}=req.body
    try{
        const user=await UserModel.findOne({_id})
        if(user){
            const passordMatch=await bcrypt.compare(oldpassword,user.password)
            if(passordMatch)
            {
                const hash=await bcrypt.hash(newpassword,5)
                await UserModel.findByIdAndUpdate(_id,{password:hash})
                res.status(204).json({msg:'password updated successfully'})
            }else{
                res.status(401).json({ error: 'Invalid password' });
            }
        }else{
            res.status(201).json({msg:"user doesnt exist, please register"})
        }
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})

module.exports={
    userRouter
}