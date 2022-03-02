import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
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
  lastScheduledAt: {
    type: Date,
    required: false,
  },
  lastExecutionAt: {
    type: Date,
    required: false,
  },
  nextExecutionAt: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  deletedAt: {
    type: Date,
    required: false,
  },
});

taskSchema.virtual("id").get(function () {
  return this._id;
});

export default taskSchema;
