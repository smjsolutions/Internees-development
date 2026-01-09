import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    pricing: [
      {
        type: Number, // only store the price
        required: true,
      },
    ],
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
