import multer from "multer";
import createError from "./error.js";

export const uploadSingleImg = (imageFile) => {
  const multerStorage = multer.memoryStorage();
  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(createError(404, "accepting only image", false));

    }
  };
  //@ CREATE  IMAGE DESTINATION
  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  //@ CREATE IMAGE
  return upload.single(imageFile);
};
export const uploadMultiImage = (fields) => {
  const multerStorage = multer.memoryStorage();
  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb( createError(404,"accepting only image", false));
    }
  };
  //@ CREATE CATEGORY IMAGE DESTINATION
  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload.fields(fields);
};
