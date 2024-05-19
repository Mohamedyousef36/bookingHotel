import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import sharp from "sharp";
import User from "../models/User.js";
import createToken from "../utils/createToken.js";
import { uploadSingleImg } from "../utils/uploadFile.js";
import { getDocument } from "./handlerController.js";



export const createUserImg = uploadSingleImg("profileImage");

//@ CREATE  IMAGE PROCESSING FUNCTION
export const resizeImage = expressAsyncHandler(async (req, res, next) => {
  const fileName =`user${Math.random(100)}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/user/${fileName}`);
    req.body.profileImage = fileName;
  }

  next();
});

// GET LOGGED USER DATA

export const getUserData = expressAsyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  console.log(req.user._id)
  next();
});

// ---CHANGE LOGGED USER PASSWORD---//
export const updateLoggedUserPassword = expressAsyncHandler(async (req, res, next) => {
  // in validator layer ask user for old password and compare it
  const hash =await bcrypt.hash(req.body.newPassword, 10);
  const user = await User.findByIdAndUpdate(
    { _id: req.user._id },

    {
      password:hash,
      passwordChangedAt: Date.now()
    },

    { new: true }
  );
  createToken(user._id,user.role)
  res.status(200).json({ message: "Success", data: user, userToken: createToken() });
});



//---CREATE---//

export const createUser =expressAsyncHandler( async (req, res, next) => {
  const user = new User(req.body);

  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    next(err);
  }
}
)
//---UPDATE--//

export const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
};

//---DELETE---//
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Deleted");
  } catch (err) {
    next(err);
  }
};

//---GET---//
export const getUser = getDocument(User);
 
//---GET ALL ---//
export const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};



