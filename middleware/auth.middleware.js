const jwt=require('jsonwebtoken')
const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    try{
        if(token)
        {
            const decoded=jwt.verify(token,'masai')
            if(decoded)
            {
                if (!req.user) {
                    req.user = {};
                }
                req.user.userID=decoded.userID
                req.role=decoded.role
                next()
            }
            else{
                res.status(200).json({msg:'you are not authorised'})
            }
        }
        else{
            res.status(200).json({msg:'you are not authorised'})
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(400).json({error:err})
    }
}

module.exports={
    auth
}