import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSet from "../utils/helpers/generateTokenAndSet.js";
import mongoose from "mongoose";

const singupUser = async(req,res)=>{
  try{
   
    const {name,email,username ,password } =req.body ;
    const user = await User.findOne({$or:[{email},{username}]});
    
    if(user){
      return res.status(400).json({
        error:"User alerady exists !"
      })
    }

    const salt =await bcrypt.genSalt(10) ;
    const hash = await bcrypt.hash(password,salt) ;


    const newUser = await User.create({
      name,
      email,
      username,
      password:hash
    })


    if(newUser){

      generateTokenAndSet(newUser._id,res) ;
      res.status(200).json({
        _id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        username:newUser.username
      })
    }
    else{
      res.status(400).json({
        error:"Invalid user data !"
      })
    }
    return ;
  }catch(e){
    res.status(500).json({
      error:e.message
    })
    console.log("error in signupUser : "+e.message)
  }
}


const loginUser = async (req,res)=>{
  try{

    const {username,password} = req.body ;
    const user = await User.findOne({username}) ;

    const isPasswordCorrect = await bcrypt.compare(password,user?.password ||"") ;

    if(!user || !isPasswordCorrect ){
      return res.status(400).json({
        error:"Invalid credentials !"
      })
    }

    generateTokenAndSet(user._id,res) ;

    res.status(200).json({
      _id:user._id,
        name:user.name,
        email:user.email,
        username:user.username
    })

  }catch(e){
    res.status(500).json({error:e.message}) ;
    console.log("error in loginUser : "+e.message)
  }
}

const logoutUser = async (req,res)=>{
  try{

    res.cookie('jwt',"",{maxAge:1}) ;
    res.status(200).json({
      message:"User logged out"
    })

  }catch(e){
    res.status(500).json({error:e.message}) ;
    console.log("error in logoutUser : "+e.message)
  }
}

const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id b -> "+id);
    console.log("userid b -> "+req.user._id);

    const userIdToModify = new mongoose.Types.ObjectId(id)
    const currentUserId = new mongoose.Types.ObjectId(req.user._id);
    
    console.log(userIdToModify);
    console.log(currentUserId);

    const userToModify = await User.findById(userIdToModify);
    const currentUser = await User.findById(currentUserId);

    if (!userToModify || !currentUser) {
      return res.status(400).json({ message: "User not found" });
    }

    

    if (userIdToModify.equals(currentUserId)) {
      return res.status(400).json({ message: "User cannot follow themselves" });
    }

    const isFollowing = currentUser.following.includes(userIdToModify);

    if (isFollowing) {
      await User.findByIdAndUpdate(currentUserId, { $pull: { following: userIdToModify } });
      await User.findByIdAndUpdate(userIdToModify, { $pull: { followers: currentUserId } });

      return res.status(200).json({ message: "User unfollowed" });
    } else {
      await User.findByIdAndUpdate(currentUserId, { $push: { following: userIdToModify } });
      await User.findByIdAndUpdate(userIdToModify, { $push: { followers: currentUserId } });

      return res.status(200).json({ message: "User followed" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log("error in follow and unfollow: " + e.message);
  }
};




const updateUser = async (req,res)=>{
  const userId = req.user._id ;
  const {name ,email,username ,password,profilepic,bio} = req.body ;
  try{
                              
    let user = await User.findById(userId) ;
    if(!user){
      return res.status(400).json({error:"User not found" })
    }

    if(req.param.id !==userId.toString()){
      return res.status(400).json({
        message:"You can't update other user's profile"
      })
    }
    
    if(password){
      const salt = await bcrypt.genSalt(10) ;
      const hashedPassword = await bcrypt.hash(password,salt) ;

      user.password = hashedPassword ;
    }

    user.name = name || user.name ;
    user.email = email || user.email ;
    user.username = username || user.username ;
    user.bio = bio || user.bio ;
    user.profilepic = profilepic || user.profilepic
    
    user =await user.save() ;

    res.status(200).json({
      message:"User updated successfully",user
    })
  }catch(e){
    res.status(500).json({ error: e.message });
    console.log("error in update: " + e.message);
  }
}


const getuserProfile = async(req,res)=>{
  const {username} = req.params ;
  try{

    const user = await User.findOne({username}).select("-password").select('-updatedAt') ;

    if(!user){
      return res.status(500).json({
        error:"User not found"
      })
    }

    res.status(200).json(user) ;

  }catch(e){
    res.status(500).json({ error: e.message });
    console.log("error in getuserprofile: " + e.message);
  }
}

export  {singupUser,loginUser,logoutUser,followUnfollowUser,updateUser,getuserProfile} 