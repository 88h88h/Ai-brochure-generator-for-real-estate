import mongoose from "mongoose";

const outputSchema = new mongoose.Schema({
  brandPositioning: {
    type: String,
    required: true,
  },
  features: {
    type: String,
    required: true,
  },
  tone: {
    type: String,
    required: true,
  },
  length: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
});

const Output = mongoose.model("Output", outputSchema);

export default Output;
