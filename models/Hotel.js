import mongoose from "mongoose"
import { type } from "os";

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      // in validation layer
      type: String,
      lowercase: true,
    },
    type: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    hotelImagCover: {
      type: String,
      required: true,
    },

    hotelImage: {
      type: [String],
    },
    city: {
      type: String,
      required:true
   },
    desc: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    rooms: {
      type: [String],
    },
    cheapestPrice: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Hotel', HotelSchema)