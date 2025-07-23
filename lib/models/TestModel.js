import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "drafting",
      enum: ["drafting", "published", "archived"],
    },
  },
  { timestamps: true }
);

const TestModel = mongoose.models.test || mongoose.model("test", TestSchema);
export default TestModel;
