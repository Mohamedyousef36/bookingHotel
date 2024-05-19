import express from "express"
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotel
} from "../controller/hotelController.js";
// import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

import roomsRoute from "./roomsRoute.js";


//CREATE
router.post('/', createHotel)
//UPDATE
router.put('/:id', updateHotel)
//DELETED
router.delete('/:id', deleteHotel)
//GET
router.get('/:id', getHotel)
//GET ALL
router.get('/', getAllHotel)
// //Count By City
// router.get('/countByCity', countByCity)
// //Count BY Type


// ########## Nested Route ########## //

router.use("/:hotelId/rooms" , roomsRoute);

export default router 