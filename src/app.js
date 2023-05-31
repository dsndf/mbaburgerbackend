import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import applyGoogleAuth from './utils/Provider.js';
import connectdb from './db/conn.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import customErrorHanlder from './middleware/customErrorHandler.js';
import errorHandler from './utils/ErrorHandler.js';
import userRouter from './routers/userRouter.js';
import userAuth from './middleware/userAuth.js';
import orderRouter from './routers/orderRouter.js';
import paymentRouter from './routers/paymenRouter.js';
import cors from 'cors';
process.on("uncaughtException", (err) => {
    console.log("" + err.message);
});


const app = express();
dotenv.config();
connectdb();
const port = process.env.PORT || 5000
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
 
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SESSION_SECERET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none",
        httpOnly: false
    }
}));

app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");
applyGoogleAuth();

app.use(userRouter);
app.use(orderRouter);
app.use(paymentRouter);
app.use(customErrorHanlder);
const server = app.listen(port, () => {
    console.log("listening at port " + port + " mode is " + process.env.NODE_ENV);
    console.log("\n" + process.env.MONGODB_URI);
});


process.on("unhandledRejection", (err) => {
    console.log("" + err.message);
    server.close(() => {
        console.log("server is closed");
    })
});
