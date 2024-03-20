const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    },
    role: {type:String, enum:["user","admin"], default:"user"}
  },{
    versionKey:false
})

const UserModel=mongoose.model('User',userSchema)
module.exports={
    UserModel
}