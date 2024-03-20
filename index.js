const express=require('express')
const app=express()
const {connection}=require('./db')
const {userRouter}=require('./route/user.route')
const {restaurantRouter}=require('./route/restaurants.route')
const {orderRouter}=require('./route/orders.route')

app.use(express.json())
app.use('/users',userRouter)
app.use('/restaurants',restaurantRouter)
app.use('/orders',orderRouter)

app.get("/",(req,res)=>{
    res.send('home page')
})
app.listen(8080,async(req,res)=>{
    console.log('connected to server')
    try{
        await connection
        console.log('connected to db')
    }
    catch(err)
    {
        console.log(err)
    }
})