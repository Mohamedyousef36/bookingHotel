import express from "express";
import  verifyToken  from "../utils/verifyToken.js"
import { deleteRoom, addRoomToHotel, getRoom, getAllRoom, updateRoom, resizeImage, createRoomImages }
    from "../controller/roomController.js";
    

const router = express.Router({mergeParams:true});
//Create
router.post("/:hotelId", createRoomImages,resizeImage, addRoomToHotel);
//UPDATE
router.put('/:id', updateRoom);
//DELETED
router.delete('/:id', deleteRoom);
//GET
router.get('/:id',getRoom);
//GET ALL
router.get('/', getAllRoom);

export default router 


