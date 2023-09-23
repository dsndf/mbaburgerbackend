import orderCollection from "../models/Orders.js";
import userCollection from "../models/User.js";
import errorHandler from "../utils/ErrorHandler.js";


export const myProfile = (req, res, next) => {
   
    res.json({ success: true, user: req.me });
}


export const getAllUsers = async (req, res, next) => {

    const users = await userCollection.find();
    res.json({
        success: true,
        users
    });

}

export const  getSingleUser = async (req,res,next)=>{
 const user  = await userCollection.findById(req.params.id);
if(!user){
    throw errorHandler("User Not Found",404);
}

res.json({
    success:true,
    user
})

}
export const  updateUserRole = async (req,res,next)=>{
    console.log("id is ",req.params.id);
 const user  = await userCollection.findById(req.params.id);
if(!user){
    throw errorHandler("User Not Found",404);
}

const {role} = user;
if(role==="admin"){
 user.role = "user";
}
else{
    user.role = "admin"
}
  console.log("updated user",await user.save());
res.json({
    success:true,
    user
})

}
export const  deleteUser = async (req,res,next)=>{
 const user  = await userCollection.findById(req.params.id);
if(!user){ 
    throw errorHandler("User Not Found",404);
}

await user.remove();
res.json({
    success:true,
    message:"User Has Been Successfully Deleted"
})

}

export const getCounts = async (req,res,next)=>{
const userCounts = await userCollection.countDocuments();

const ordersCounts = await orderCollection.countDocuments();
const orders = await orderCollection.find();
 
let processingOrders = 0;
let deliveredOrders =0;
let shippedOrders = 0;
let totalIncome = 0;
for(let i of orders){
    totalIncome+=i.totalPrice;
 if(i.orderStatus === "Processing"){
    processingOrders++;
 }
 else if(i.orderStatus === "Shipped"){
shippedOrders++;
 }
 else{
deliveredOrders++;
 }
}




res.json({
    success:true,
    userCounts,
    totalIncome,
    ordersCounts,
    processingOrders,
    shippedOrders,
    deliveredOrders
});

}


