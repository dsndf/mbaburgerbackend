import mongoose, { mongo } from 'mongoose';
mongoose.set("strictQuery", false);
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.SESSION_SECERET);
const connectdb = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(() => {
        console.log("Database connected");
    });
}
export default connectdb;