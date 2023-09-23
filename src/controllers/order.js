import orderCollection from "../models/Orders.js";
import errorHandler from "../utils/ErrorHandler.js";

const createdOrder = async (req, res, next) => {
   const order = req.body;
   console.log(order)
 
    const {
        shippingInfo,
        orderItems,
        paymentMethod,
        paymentInfo,
        itemsPrice,
        totalPrice,
        taxPrice,
        shippingPrice,
    } = order;
    let paidAt;
if(paymentMethod === 'Online'){
    paidAt = Date.now();
} 
     if(!req.user){
        throw errorHandler("User is inavalid",400);
     }
    const user = req.user._id;
    
    const newOrder = await orderCollection.create({
        shippingInfo,
        orderItems,
        user,
        paymentInfo,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
        paidAt,
        shippingPrice
    });
    res.json({
        success: true,
        order: newOrder,
        message: "Order Has Been Placed Successfully"
    })

};

export const myOrders = async (req, res, next) => {

    const id = req.user._id;
    const orders = await orderCollection.find({ user: id }).populate(
        "user", "name email"
    );
    if (!orders) {
        throw errorHandler("You Haven't Placed Any Order Yet", 404);
    }
    else {
        res.json({
            success: true,
            orders
        })
    }
}
export const getSingleOrder = async (req, res, next) => {

    const order = await orderCollection.findById(req.params.id);
    if (!order) {
        throw errorHandler("Oops Order Not Found", 404);
        
    }
    else {
        res.json({
            success: true,
            order
        })
    }
}
export const getAllOrders = async (req, res, next) => {

    const orders = await orderCollection.find();
    if (!orders) {
        throw errorHandler("There Are No Orders", 404);
    }
    else {
        res.json({
            success: true,
            orders
        })
    }
}
export const updateOrder = async (req, res, next) => {

    const order = await orderCollection.findById(req.params.id);
    if (!order) {
        throw errorHandler("Oops Order Not Found", 404);
    }
    else {
        
        if (order.orderStatus === "Shipped"  ) {
             order.orderStatus = "Delivered"
            order.deliveredAt = Date.now();
            if(order.paymentMethod === 'COD'){
                 order.paidAt = Date.now();
            }
           
        } 
     

       else if (order.orderStatus === "Processing") {
             order.orderStatus = "Shipped"
        }
       else if (order.orderStatus === "Delivered") {
                 throw errorHandler("Already Delivered",400);
        }
        await order.save();
        res.json({ 
            success: true,
            order 
        })
    }
}
export const deleteOrder = async (req, res, next) => {

    const order = await orderCollection.findById(req.params.id);
    if (!order) {
       return next(errorHandler("Oops Order Not Found", 404))
    }
    else {
        await order.remove();

        res.json({
            success: true,
            message: "Order Has Been Deleted Successfully"
        })
    }
}
export default createdOrder;
