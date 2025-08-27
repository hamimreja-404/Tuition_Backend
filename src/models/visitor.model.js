import mongoose, { Schema } from "mongoose";

const VisitorSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
});


export const Visitor = mongoose.model("Visitor", VisitorSchema);
