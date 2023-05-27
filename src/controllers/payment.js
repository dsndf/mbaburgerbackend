import Stripe from 'stripe';

const stripe = Stripe(`${process.env.STRIPE_SECRET_KEY}`);


export const paymentProcess = async (req, res, next) => {

    const myPayment = await stripe.paymentIntents.create({

        amount: req.body.amount,
        payment_method: req.body.id,
        currency: "inr",
        metadata: {
            company: "MBA BURGER WALA"
        }
        ,
        confirm: true
    });

    res.json({
        success: true,
        client_secret: myPayment.client_secret
    });

}

export const getStripeApiKey = async (req,res,next)=>{

    res.json({stripeApiKey:`${process.env.STRIPE_API_KEY}`})
}