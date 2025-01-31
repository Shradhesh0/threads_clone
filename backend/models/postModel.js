import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  postedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  text:{
    type:String,
    maxLength:500
  },
  image:{
    type:String,
  },
  likes:{
    // array of userId
    type:[mongoose.Schema.Types.ObjectId],
    ref:"User",
    default:[]
  },
  replies:[
    {
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
      },
      text:{
        type:String,
        required:true
      },
      userProfilepic:{
        type:String,
      },
      username:{
        type:String
      }
    }
  ]
},{
  timestamps:true
})

const Post = mongoose.model('Post',postSchema)
export default Post ;