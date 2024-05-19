import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import createError from "../utils/error.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";





// start of register

export const register = expressAsyncHandler(async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        profileImage:req.body.profileImage

    });
    // start create token
         createToken(user._id, user.role);


    // end create token
    await user.save();
    res.status(201).json({ message: "success", data: user, userToken: createToken()});
});
// end of register

// start of login
export const login = expressAsyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(req.body.password)
    console.log(user.password)
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(createError(404, "Password Or Email is Un Correct"));
    }
      createToken(user._id, user.role);


    // const { password, isAdmin, ...otherDetails } = user._doc;

    res.status(201).json({message:"Success",data:user,userToken:createToken()});
});



