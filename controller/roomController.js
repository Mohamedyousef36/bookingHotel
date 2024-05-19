import sharp from "sharp";
import Room from "../models/Room.js";
import {
    deleteDocument,
    getDocument,
    updateDocument,
    getAllDocuments,
} from "./handlerController.js";
import Hotel from "../models/Hotel.js";
import expressAsyncHandler from "express-async-handler";
import { uploadMultiImage } from "../utils/uploadFile.js";



//## => Create Image
export const createRoomImages = uploadMultiImage([
    { name: "roomImagCover", maxCount: 1 },
    { name: "roomImage", maxCount: 6 }])

//## => Create  Image Processing Function 
export const resizeImage = expressAsyncHandler(async (req, res, next) => {
    if (req.files.roomImagCover) {
      const fileImageName = `room${Math.random(
        100
      )}-${Date.now()}_cover_img.jpeg`;
      await sharp(req.files.roomImagCover[0].buffer)
        .resize(1200, 1300)
        .toFormat("jpeg")
        .jpeg({ quality: 95 })
        .toFile(`uploads/room/${fileImageName}`);
      req.body.roomImagCover = fileImageName;
    }
        if (req.files.roomImage) {
            req.body.roomImage = [];
            await Promise.all(
              req.files.roomImage.map(
                expressAsyncHandler(async (img) => {
                  const fileImageName = `room${Math.random(
                    100
                  )}-${Date.now()}.jpeg`;

                  await sharp(req.files.roomImage[0].buffer)
                    .resize(1200, 1300)
                    .toFormat("jpeg")
                    .jpeg({ quality: 95 })
                    .toFile(`uploads/room/${fileImageName}`);
                  req.body.roomImage.push(fileImageName);
                })
              )
            );

        }
        next();

    })


// create room and push it into hotel
export const addRoomToHotel =  expressAsyncHandler(
        async (req, res, next) => {

            const hotelId = req.params.hotelId;
            const newRoom = await Room.create(req.body);
            const savedRoom = await newRoom.save();

            await Hotel.findByIdAndUpdate(
                hotelId,
              { $addToSet: { rooms: savedRoom._id }},
                { new: true }
        )
        res.status(201).json({message:"Success",data:savedRoom})
        }
    )





//---UPDATE--//

export const updateRoom = updateDocument(Room)

//---DELETE---//
export const deleteRoom = deleteDocument(Room)

//---GET---//
export const getRoom = getDocument(Room)

//---GET ALL ---//
export const getAllRoom = getAllDocuments(Room)

