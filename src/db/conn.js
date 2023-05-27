import mongoose, { mongo } from 'mongoose';
mongoose.set("strictQuery", false);
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.SESSION_SECERET);
const connectdb = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/OnlineFood", {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(() => {
        console.log("Database connected");
    });
}
export default connectdb;