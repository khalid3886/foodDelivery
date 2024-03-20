const mongoose=require('mongoose')
const { Schema } = mongoose;

const orderSchema=mongoose.Schema({
    user : { type: Schema.Types.ObjectId, ref: 'User' },
    restaurant : { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  items: [{
    name: String,
    price: Number,
    quantity: Number
  }],
  totalPrice: Number,
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  status: {type:String, enum:["placed","preparing","on the way","delivered"], default:"placed"}
}
,{
    versionKey:false
})

const OrderModel=mongoose.model('Order',orderSchema)
module.exports={
    OrderModel
}