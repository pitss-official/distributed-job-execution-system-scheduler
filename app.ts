// const mongoose = require("mongoose");
// const Redis = require("redis");
// const redis = Redis.createClient();
// const mongoDB =
//   "mongodb+srv://taskServer:DLv7yl2t2UM1lGaY@india.c9r36.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// const taskSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   active: {
//     type: Boolean,
//     default: true,
//   },
//   script: {
//     type: String,
//     required: true,
//   },
//   schedule: {
//     type: String,
//     required: true,
//   },
//   lastScheduledAt: {
//     type: Date,
//     required: false,
//   },
//   lastExecutionAt: {
//     type: Date,
//     required: false,
//   },
//   nextExecutionAt: {
//     type: Date,
//     required: false,
//   },
//   createdAt: {
//     type: Date,
//     default: new Date(),
//   },
//   updatedAt: {
//     type: Date,
//     required: false,
//   },
//   deletedAt: {
//     type: Date,
//     required: false,
//   },
// });

// const executionSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   active: {
//     type: Boolean,
//     default: true,
//   },
//   script: {
//     type: String,
//     required: true,
//   },
//   schedule: {
//     type: String,
//     required: true,
//   },
//   lastExecutionAt: {
//     type: Date,
//     required: false,
//   },
//   nextExecutionAt: {
//     type: Date,
//     required: false,
//   },
//   startedAt: {
//     type: Date,
//     default: new Date(),
//   },
//   finishedAt: {
//     type: Date,
//     required: false,
//   },
// });
//
// executionSchema.virtual("id").get(function () {
//   return this._id;
// });

// const Task = mongoose.model("Task", taskSchema);

// const express = require("express");
// const app = express();
// const API_PORT = 3000;

// app.use(express.json());
// app.get("/health", (req, res) => {
//   res.send({
//     alive: true,
//   });
// });
//
// app.post("/task", async ({ body }, res) => {
//   try {
//     const task = await Task.create(body);
//
//     res.send(task.toObject({ virtuals: true }));
//   } catch (e) {
//     res.send(e);
//   }
// });
//
// app.post("/task/:id/execute", async (req, res) => {
//   const taskId: string = req.params.id;
//   const state: undefined | "started" | "finished" | "failed" =
//     req.query?.params?.state;
//
//   if (!state) {
//     res.status(400).send();
//   }
//
//   try {
//     const task = await Task.findById(taskId);
//     res.send(task);
//   } catch (err) {
//     res.status(404).send();
//   }
// });
//
// app.listen(API_PORT, () => {
//   console.log(`API listening on port ${API_PORT}`);
// });

// redis.on("error", (err) => console.log("Redis Client Error", err));
// redis.connect().then(() => console.log("Redis Connected"));
// db.on("error", console.error);error
// db.on("connect", () => console.log("DB Connected"));

//======Scheduler=======//

import Core from "./app/core";

Core.start();
