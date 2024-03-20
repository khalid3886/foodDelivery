const access=(permittedRole)=>{
    return(req,res,next)=>{
        if(permittedRole.includes(req.role))
        {
            next()
        }else{
            res.status(400).json({msg:'you are not authorised'})
        }
    }
}

module.exports={
    access
}