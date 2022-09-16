"use strict";

import mongoose from "mongoose";
import taskSchema from "../../schemas/task";
import cron from "cron";

const TaskModel = mongoose.model("Task", taskSchema);

export default class Task extends TaskModel {
  constructor(props: any) {
    super(props);
  }

  get score() {
    // Todo: Configurable algorithms for scheduling
    return cron.sendAt(this.schedule).valueOf();
  }
}
