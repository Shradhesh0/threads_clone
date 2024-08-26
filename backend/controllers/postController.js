import mongoose from "mongoose";
import Post from "../models/postModel.js"
import User from '../models/userModel.js'

const createPost = async (req,res)=>{
  try{
    
    const {postedBy ,text,img} = req.body ;

    if(!postedBy || !text){
      return res.status(400).json({
        message:"postedBY and text fields required !"
      })
    }

    const user =  await User.findById(postedBy);
    if(!user){
      return res.status(400).json({
        message:"User not found !"
      })
    }

    if(user._id.toString() !== req.user._id.toString()){
      return res.status(401).json({
        message:"Unauthorized to create post !"
      })
    }

    const maxLength = 500 ;
    if(text.length > maxLength){
      return res.status(400).json({
        message:"Text length should be less than 500 characters !"
      })
    }

    const newPost = new Post({postedBy,text,img}) ;
    await newPost.save() ;

    res.status(200).json({
      message:"Post created successfully !",
      newPost
    })

  }catch(e){

    res.status(500).json({
      
        message:e.message
      
    })
    console.log("error occured in create post "+e)
  }
}



const getPost =  async(req,res)=>{

  try{
     
    const post = await Post.findById(req.params.id) ;

    if(!post){
      return res.status(404).json({
        message:"Post not found !"
      })
    }

    res.status(200).json({
      message:"Post Found",post
    })

  }catch(e){
    res.status(500).json({
      
      message:e.message
    
  })
  console.log("error occured in get post "+e)
  }
}


const deletePost=  async(req,res)=>{

  try{
    
    req.params.id = new mongoose.Types.ObjectId(req.params.id) ;
    const post = await Post.findById(req.params.id) ;

    if(!post){
      return res.status(404).json({
        message:"Post not found !"
      })
    }

    if(post.postedBy.toString() !== req.user._id.toString()){
      return res.status(401).json({
        message:"unauthorized to delete post"
      })
    }
    
    await Post.findByIdAndDelete(req.params.id) ;

    res.status(200).json({
      message:"successfully deleted post !"
    })

  }catch(e){
    res.status(500).json({
      
      message:e.message
    
  })
  console.log("error occured in delete post "+e)
  }
}



const likeUnlikePost = async(req,res)=>{
  try{
     
    let {id:postId} = req.params; 
    postId = new mongoose.Types.ObjectId(req.params) ;
    const userId =  req.user._id ;

    const post  =  await Post.findById(postId)

    if(!post){
      return res.status(404).json({
        message:"Post not found !" 
      })
    }

    const userLikedPost = post.likes.includes(userId) ;

    if(userLikedPost){
      // unlike 
      await Post.updateOne({_id:postId},{
        $pull:{likes:userId}
      })
      res.status(200).json({
        message:"successfully unliked post !"
      })
    }else{
      //like post
      post.likes.push(userId) ;
      await post.save() ;
      res.status(200).json({
        message:"successfully liked post !"
      })
    }

  }catch(e){
    res.status(500).json({
      
      message:e.message
    
  })
  console.log("error occured in likeUnlike post "+e)
  }
}


const replyPost = async(req,res)=>{

  try{

    const {text} = req.body ;
    let {id:postId} = req.params ;
    postId = new mongoose.Types.ObjectId(postId) ;
    let userId =  req.user._id ;
    userId = new mongoose.Types.ObjectId(userId) ;
    const userProfilePic = req.user.userProfilePic ;
    const username =  req.user.username ;

    if(!text){
      return res.status(400).json({
        message:"please enter text to reply !"
      })
    }

    const post = await Post.findById(postId) ;
    if(!post){
      return res.status(404).json({
        message:"Post not found !"
      })
    }

    const reply = {userId,text,userProfilePic,username} ;
    post.replies.push(reply) ;
    await post.save() ;

    res.status(200).json({
      message:"successfully replied !",
      reply
    })

  }catch(e){
    res.status(500).json({
      message:e.message   
  })
  console.log("error occured in likeUnlike post "+e)
  }
}



const getFeedPost= async(req,res)=>{
  try{

    let userId = req.user._id ;
    userId = new mongoose.Types.ObjectId(userId) ; 
    const user = await User.findById(userId) ;
     
    if(!user){
      return res.status(404).json({
        message:"User not found !"
      })
    }

    const following = user.following ;
  
    const feedPosts = await Post.find({userId:{$in:following}}).sort({createdAt:-1}) ;

    res.status(200).json({
      feedPosts
    })
   
  }catch(e){
    res.status(500).json({
      message:e.message   
  })
  console.log("error occured in Feed post "+e)
  }
  
}

export {createPost,getPost,deletePost,likeUnlikePost,replyPost,getFeedPost} ;