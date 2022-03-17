import express from "express";
import config from "config";
import Task from "../models/Task";

//Todo: Rearrange stuff here

const app = express();
const API_PORT = config.get("system.core.services.api.port");
app.use(express.json());
app.get("/health", (req, res) => {
  res.send({
    alive: true,
  });
});

app.post("/task", async ({ body }, res) => {
  try {
    const task = await Task.create(body);

    res.send(task.toObject({ virtuals: true }));
  } catch (e) {
    res.send(e);
  }
});

app.post("/task/:id/execute", async (req, res) => {
  const taskId: string = req.params.id;
  const state: undefined | "started" | "finished" | "failed" =
    req.query?.params?.state;

  if (!state) {
    res.status(400).send();
  }

  try {
    const task = await Task.findById(taskId);
    res.send(task);
  } catch (err) {
    res.status(404).send();
  }
});

app.listen(API_PORT, () => {
  console.log(`API listening on port ${API_PORT}`);
});
