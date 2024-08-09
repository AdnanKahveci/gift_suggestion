import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName:{
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    itemPurchased: {
      type: String,
    },
    category: {
      type: String,
    },
    purchaseAmountUSD:{
      type: Number,
    },
    location: {
      type: String,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    season: {
      type: String,
    },
    reviewRating: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);