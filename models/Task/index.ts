"use strict";

import mongoose from "mongoose";
import taskSchema from "../../schemas/task";

const TaskModel = mongoose.model("Task", taskSchema);

export default class Task extends TaskModel {
  constructor(props) {
    super(props);
  }
}
