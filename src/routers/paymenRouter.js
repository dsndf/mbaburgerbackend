import express from 'express';
import { getStripeApiKey, paymentProcess } from '../controllers/payment.js';
import userAuth from '../middleware/userAuth.js';
import asyncError from '../utils/asyncError.js';

const paymentRouter = express.Router(); 
paymentRouter.post("/process/payment",userAuth,asyncError(paymentProcess));
paymentRouter.get("/stripe/api/key",userAuth,asyncError(getStripeApiKey));
export default paymentRouter;