import express from "express"
import User from "../models/User.js"
import verifyToken from "../utils/verifyToken.js"
import {
  deleteUser,
  createUser,
  getUser,
  getAllUser,
  updateUser,
  updateLoggedUserPassword,
} from "../controller/userController.js";
import { getUserData } from "../controller/userController.js";
const router = express.Router();

// Admin Access 
//UPDATE
router.put('/:id',updateUser)
//DELETED
router.delete('/:id',deleteUser)
//GET
router.get('/:id',getUser)
//GET ALL
router.get('/', getAllUser)

router.use(verifyToken)
router.get("/getdata/getme", getUserData, getUser);
router.put("/getdata/changemypassword", updateLoggedUserPassword);
// router.put("/updateUserData", updateLoggedUserValidator, updateLoggedUserData);
// router.delete("/deactivateMyAccount", deactivateMyAccount);
// router.delete("/activeMyAccount", activateMyAccount);
// router.delete("/deleteMyAccount", deleteMyAccount);


export default router 