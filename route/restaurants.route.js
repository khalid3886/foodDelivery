const express=require('express')
const restaurantRouter=express.Router()
const {RestaurantModel}=require('../model/restaunt.model')
const{access}=require('../middleware/access.middleware')
const {auth}=require('../middleware/auth.middleware')


restaurantRouter.post('/',auth,access(["admin"]),async(req,res)=>{
    const {name,address,menu} =req.body
    try{
        const newRestaurant=new RestaurantModel({name,address,menu})
        await newRestaurant.save()
        res.status(201).json({msg:'new restaurant data has been added'})
    }
    catch(err)
    {
        console.log(err)
        res.status(400).json({error:err})
    }
})

restaurantRouter.get('/',async(req,res)=>{
    try{
        const restaurant=await RestaurantModel.find()
        res.status(200).json({msg:'all restaurant data',restaurant})
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})

restaurantRouter.get('/:id',async(req,res)=>{
    const _id=req.params.id
    try{
        const restaurant=await RestaurantModel.findOne({_id})
        res.status(200).json({msg:'restaurant data',restaurant})
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})

restaurantRouter.get('/:id/menu',async(req,res)=>{
    const _id=req.params.id
    try{
        const restaurant=await RestaurantModel.findOne({_id})
        const {menu}=restaurant
        res.status(200).json({msg:'menu data',menu})
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})

restaurantRouter.post('/:id/menu',auth,access(["admin"]),async(req,res)=>{
    const _id=req.params.id
    const {name,description,price,image}=req.body
    try{
        const restaurant=await RestaurantModel.findOne({_id})
        if(!restaurant)
        {
            res.status(404).json({msg:'restaurant not found'})
        }
        const newMenu={
            name,
            description,
            price,
            image
        }
        restaurant.menu.push(newMenu)
        await restaurant.save()
        res.status(201).json({msg:"new menu has been added"}) 
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})

restaurantRouter.delete('/:id/menu/:menuid',auth,access(["admin"]),async(req,res)=>{
    const _id=req.params.id;
    const menuID=req.params.menuid
    try
    {
        const restaurant=await RestaurantModel.findOne({_id})
        if(!restaurant)
        {
            res.status(404).json({msg:'restaurant not found'})
        }
        const menuIndex=restaurant.menu.findIndex(item=>item._id.toString()===menuID)
        if(menuIndex===-1)
        {
            res.status(404).json({msg:'menu not found'})
        }
        restaurant.menu.splice(menuIndex,1)
        await restaurant.save()
        res.status(202).json({msg:"menu has been deleted"})
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
})

module.exports={
   restaurantRouter
}