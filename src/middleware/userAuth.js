// import errorHandler from "../utils/ErrorHandler";

import errorHandler from "../utils/ErrorHandler.js";

 const userAuth = async (req,res,next)=>{
   const token =  req.cookies['connect.sid'];
  console.log("this is token "+token);
    if(!token){
     next(errorHandler("Please log in"));       
    }
next();
}
export default userAuth;
