import mongoose from "mongoose";

const executionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  script: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  lastExecutionAt: {
    type: Date,
    required: false,
  },
  nextExecutionAt: {
    type: Date,
    required: false,
  },
  startedAt: {
    type: Date,
    default: new Date(),
  },
  finishedAt: {
    type: Date,
    required: false,
  },
});

executionSchema.virtual("id").get(function () {
  return this._id;
});

export default executionSchema;
