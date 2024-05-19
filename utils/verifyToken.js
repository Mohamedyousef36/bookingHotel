import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import createError from "./error.js";
import User from "../models/User.js";

// start of verify token

 const verifyToken = expressAsyncHandler(async (req, res, next) => {
  // try to catch token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(createError(500, "Please Login Again"));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decoded.id);
  if (!user) {
    return next(createError(500, "No User Found"));
  }

  // check if password changed

  if (user.passwordChangedAt) {
    const passwordChangeAtTimeStamp = parseInt(
      user.passwordChangedAt.getTime() / 1000
    );
    if (passwordChangeAtTimeStamp > decoded.iat) {
      return next(
        createError(404,"Password Has Changed Recently Please Login Again")
      );
    }
   }
   req.user = user

   next();

});

// end of verify token

export default verifyToken
