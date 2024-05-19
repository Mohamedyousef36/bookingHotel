import mongoose from "mongoose"
const { schema } = mongoose

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "Too short password"],
    },
    profileImage: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "manager", "admin"],
      default: "user",
    },

    passwordChangedAt: {
      type: Date,
    },

    passwordRestCode: {
      type: String,
    },
    passwordExpireDate: {
      type: Date,
    },
    passwordVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema)