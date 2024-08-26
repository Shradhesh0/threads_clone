import { Router } from "express";
const router =  Router() ;
import {singupUser,loginUser,logoutUser,followUnfollowUser,updateUser} from "../controllers/userController.js";
import { protectRoute } from "../middelewares/protectRoute.js";
import { getuserProfile } from "../controllers/userController.js";

router.post('/signup',singupUser) ;
router.post('/login',loginUser) ;
router.post('/logout',logoutUser) ;
router.post('/follow/:id',protectRoute,followUnfollowUser) ;
router.post('/update/:id',protectRoute,updateUser) ;
router.get('/profile/:username',getuserProfile) ;


//login
//follow user
//update profile

export default router ;