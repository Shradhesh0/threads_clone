import User from "../models/userModel.js";
import jwt  from 'jsonwebtoken' ;


const protectRoute = async (req,res,next)=>{
  try{

   const token = req.cookies.jwt ;

   if(!token) return res.status(401).json({
    message:"unauthorized"
   })

   const decoded = jwt.verify(token,process.env.JWT_SECRET) ;

   const user = await User.findById(decoded.userId).select("-password") ;

   if(user){
    req.user = user ;
    next() ;

   }else{
   throw new Error ;
     
   }

  


  }catch(e){
    res.status(500).json({message:e.message}) ;
    console.log("error protect route : "+e.message)
  }
}

export {protectRoute} ;