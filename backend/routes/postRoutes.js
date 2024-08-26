import { Router } from "express";
const router = Router() ;
import { createPost,getPost,deletePost,likeUnlikePost,replyPost ,getFeedPost} from "../controllers/postController.js";
import {protectRoute} from '../middelewares/protectRoute.js'
 
router.get('/feed',protectRoute,getFeedPost) ;
router.post('/create',protectRoute,createPost) ;
router.get('/:id',getPost) ;
router.delete('/:id',protectRoute,deletePost) ;
router.post('/likes/:id',protectRoute,likeUnlikePost) ;
router.post('/reply/:id',protectRoute,replyPost) ;



export default router ;