const express=require('express')
const orderRouter=express.Router()
const {OrderModel}=require('../model/order.model')
const {auth}=require('../middleware/auth.middleware')
const{access}=require('../middleware/access.middleware')

orderRouter.post('/',auth,async(req,res)=>{
const {userID}=req.user
const {restaurant,items,deliveryAddress}=req.body
const totalPrice=calculateTotalPrice(items)
try{
const newOrder=new OrderModel({user:userID,restaurant,items,totalPrice,deliveryAddress})
await newOrder.save()
res.status(201).json({msg:"new order has been placed"})
}
catch(err)
{
    console.log(err)
    res.status(400).json({error:err})
}
})

orderRouter.get('/:id',auth,async(req,res)=>{
    const _id=req.params.id
    try{
        const order=await OrderModel.findOne({_id})
        if(!order)
        {
            res.status(404).json({msg:'order not found'})
        }
        res.status(200).json(order)        
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})

orderRouter.patch('/:id',auth,access(["admin"]),async(req,res)=>{
    const _id=req.params.id
    const {status}=req.body
    try{
        await OrderModel.findByIdAndUpdate(_id,{status})
        res.status(204).json({msg:'status has been updated'})
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})

function calculateTotalPrice(items) {
    let totalPrice = 0;
    for (const item of items) {
        totalPrice += item.price * item.quantity;
    }
    return totalPrice;
}

module.exports={
    orderRouter
}