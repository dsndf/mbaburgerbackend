import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
    ,
    googleId: {
        type: String,
        unique: true,
        required: true
    }
    ,
    email: {
        type: String,
        required: true,
        unique: true
    }
    ,
    photo: {
        type: String
    }
    ,
    role: {
        type: String,
        default: "user"
    },  
    createdAt: {
        type: String,
        default: new Date().toLocaleDateString()
    }

});

const userCollection  = new mongoose.model("User",userSchema);

export default userCollection;