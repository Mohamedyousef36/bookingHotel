import expressAsyncHandler from "express-async-handler";
import sharp from "sharp";
import Hotel from "../models/Hotel.js";
import {
  createDocument,
  deleteDocument,
  getDocument,
  updateDocument,
  getAllDocuments,
} from "./handlerController.js";
import { uploadMultiImage } from "../utils/uploadFile.js";

//## => Create Image
export const createHotelImages = uploadMultiImage([
  { name: "hotelImagCover", maxCount: 1 },
  { name: "hotelImage", maxCount: 6 },
]);

//## => Create  Image Processing Function
export const resizeImage = expressAsyncHandler(async (req, res, next) => {
  if (req.files.hotelImagCover) {
    const fileImageName = `room${Math.random(
      100
    )}-${Date.now()}_cover_img.jpeg`;
    await sharp(req.files.hotelImagCover[0].buffer)
      .resize(1200, 1300)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/hotel/${fileImageName}`);
    req.body.hotelImagCover = fileImageName;
  }
  if (req.files.hotelImage) {
    req.body.hotelImage = [];
    await Promise.all(
      req.files.hotelImage.map(
        expressAsyncHandler(async (img) => {
          const fileImageName = `room${Math.random(100)}-${Date.now()}.jpeg`;

          await sharp(req.files.hotelImage[0].buffer)
            .resize(1200, 1300)
            .toFormat("jpeg")
            .jpeg({ quality: 95 })
            .toFile(`uploads/room/${fileImageName}`);
          req.body.hotelImage.push(fileImageName);
        })
      )
    );
  }
  next();
});

//---CREATE---//
export const createHotel = createDocument(Hotel)


//---UPDATE--//

export const updateHotel = updateDocument(Hotel)

//---DELETE---//
export const deleteHotel = deleteDocument(Hotel)

//---GET---//
export const getHotel = getDocument(Hotel)

//---GET ALL ---//
export const getAllHotel = getAllDocuments(Hotel)
