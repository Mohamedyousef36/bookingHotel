import express from "express"
import { register } from "../controller/authController.js";
import { login } from "../controller/authController.js";
// import verifyToken from "../utils/verifyToken.js"
import  {forgetPassword, verifyResetCode}  from "../controller/forgetPasswordController.js";
import { createUserImg, resizeImage } from "../controller/userController.js";
const router = express.Router();


router.post("/register", createUserImg, resizeImage, register);
router.post("/login", login);
router.post("/forgetpassword",forgetPassword);
router.post("/resetpassword", verifyResetCode);
   
export default router