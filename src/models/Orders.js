import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        hNo: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true,
        },
        
        state:{
type:String,
required:true
        },
        country: {
            type: String,
            required: true
        }

        ,
    phoneNumber:{
        type:Number,
        required:true
    }
        ,
        pincode: {
            type: Number,
            required: true,
        }
    }
    ,

    orderItems:[
    {
        name:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true
        }
        ,
        quantity:{
            type:Number,
            required:true
        }
    }

    ]
 
    
    ,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

    itemsPrice: {
        type: Number,
        required: true
    },

    taxPrice: {
        type: Number,
        required: true
    },

    shippingPrice: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true
    }
    ,
    paymentInfo: {
        id: {
            type: String,
        },
        status: {
            type: String,
       
        },
    }
    ,
    paymentMethod: {
        type: String,
        enum: ["COD", 'Online'],
        default: "COD"
    },
    paidAt: {
        type: Date,
    }
    ,

    orderStatus: { 
        type: String,
    enum: ["Processing", "Shipped", "Delivered"],
    default:"Processing"
    }
    ,

    deliveredAt: {
        type: Date
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now()
    }

}

);


const orderCollection = new mongoose.model('Order', orderSchema);

export default orderCollection;