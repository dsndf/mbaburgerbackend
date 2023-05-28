import passport from 'passport';
import {Strategy as GoogleStradegy, Strategy } from 'passport-google-oauth20';
import userCollection from '../models/User.js';
import dotenv from 'dotenv';
// dotenv.config();

const applyGoogleAuth = () => {
console.log(process.env.CALLBACK_URL)
    passport.use(new Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL ,
        passReqToCallback: true

    }, async (request, accessToken, refreshToken, profile, cb) => {
        const user = await userCollection.findOne({ googleId: profile.id });
        if (!user) {
            const newUser = await userCollection.create({
                googleId: profile.id,
                name: profile.displayName,
                photo: profile.photos[0].value,
                email:profile.emails[0].value
            });
            return cb(null, newUser);
        }
        else {
            return cb(null, user);
        }
    }))
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await userCollection.findById(id);
        done(null, user);
    
    })
    
}
export default applyGoogleAuth;
