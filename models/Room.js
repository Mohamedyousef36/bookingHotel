import mongoose from "mongoose"
import { type } from "os";
const { schema } = mongoose

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    roomNumber: {
      type: Number,
    },
    roomImagCover: {
      type: String,
      required: true,
    },

    roomImage: {
      type: [String],
    },

    unavailableDate: { type: [Date] },
  },
  { timestamps: true }
);

export default mongoose.model('Room', RoomSchema)