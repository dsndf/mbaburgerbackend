import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Name has less than 3 words"]
    },
    email: {
        type: String
        , required: true
    }
    ,
    message: {
        type: String,
        required: true
    }

});

const contactCollection  = new mongoose.model("Contact",contactSchema);

export default contactCollection;