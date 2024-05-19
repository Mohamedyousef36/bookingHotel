

import expressAsyncHandler from "express-async-handler"
import crypto from "crypto"
import User from "../models/User.js"
import sendEmail from "../utils/sendEmails.js"
import createError from "../utils/error.js"


 export const  forgetPassword = expressAsyncHandler(
     async (req, res, next) => {
         
         // check if user exist
         
         const user = await User.findOne({ email: req.body.email })
         if (!user) {
             return next(401, "No User Found Please Enter Correct Email")
         }

         // generate random digits and change it to string and to save it as string

         const randomCode = Math.ceil(Math.random() * 1000000).toString();;;
         console.log(randomCode)
         
         // hash random code 
         const hashedRandomCode = crypto.createHmac("sha256", process.env.JWT_SECRET_KEY)
             .update(randomCode)
             .digest("hex");
         // save random code in db of the user
         user.passwordRestCode = hashedRandomCode;
         user.passwordExpireDate = Date.now() + 5 * 1000;
         user.passwordVerified = false;
         await user.save();
             
         // send the code via email
         try {
             await sendEmail({
                 email: user.email,
                 subject: 'Your Reset Code (Valid For 5 Minute)',
                 message: `<h3>Hi ${user.name}</h3> \n We received request to reset password your verify code is ${randomCode}\n Enter code to complete the verification`
             });
         } catch (err) {
             user.passwordRestCode = undefined;
             user.passwordExpireDate = undefined;
             user.passwordVerified = undefined;

             await user.save();

             return next(createError(500,err.message))
         
         }
     
         res.status(201).send('send code to email')


     })
         
// verified sending code and entering code 

export const verifyResetCode = expressAsyncHandler(async (req, res, next) => {
    const hashedResetCode = crypto
      .createHmac("sha256", process.env.JWT_SECRET_KEY)
      .update(req.body.resetCode)
        .digest("hex");
    
    const user = User.findOne({
      passwordRestCode: hashedResetCode,
      passwordExpireDate:{$gt: Date.now()}
    });
if (!user) {
  return next( createError(404,"Invalid or expired reset code , please try again"));
    }
 user.passwordVerified = true;
 res.status(201).send("Valid reset code");
    }) 
     
   

