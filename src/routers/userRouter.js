import express from 'express';
import passport from 'passport';
import { deleteUser, getAllUsers, getCounts, getSingleUser, loginSuccess, myProfile, updateUserRole } from '../controllers/userController.js';
import asyncError from '../utils/asyncError.js';
import userAuth from '../middleware/userAuth.js';
import authorization from '../middleware/authorization.js';
import dotenv from 'dotenv';
dotenv.config();
const userRouter = express.Router();

userRouter.route('/').get((req, res) => {
    res.send("home");
})

userRouter.route('/google/login').get(passport.authenticate("google", {
    scope: ["profile", "email"],
    successRedirect: '/success',
    successMessage: "Happy login",
    failureRedirect: "/fail",
}));

userRouter.route('/login').get(passport.authenticate("google", {
    failureRedirect: '/fail',
    successRedirect: process.env.FRONTEND_URL
}));
userRouter.route('/fail').get((req, res) => {
    res.send("failed to login");
});

userRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
    console.log(err);
            req.logout((err)=>{
            
                    console.log("logout successfully")
                
            });
            res.clearCookie('connect.sid');
           res.send({success:true});

    })
})

userRouter.route('/success').get(loginSuccess);
userRouter.route('/me').get(userAuth, myProfile);
userRouter.get("/admin/users", userAuth, authorization("admin"), asyncError(getAllUsers));
userRouter.get("/admin/user/:id", userAuth, authorization("admin"), asyncError(getSingleUser));
userRouter.put("/admin/user/update/:id", userAuth, authorization("admin"), asyncError(updateUserRole));
userRouter.delete("/admin/user/:id", userAuth, authorization("admin"), asyncError(deleteUser));
userRouter.get('/admin/stats', userAuth, authorization("admin"), getCounts);
export default userRouter;