//TODO: Improvement: cut down scheduler based on user Ids
import Task from "../../../models/Task";
import cron from "cron";
import config from "config";

class Scheduler {
  private readonly cronService;
  private readonly config = config.get("system.core.scheduler");
  private running = false;

  constructor() {
    this.cronService = new cron.CronJob(
      this.config.cron,
      this.onTick,
      this.onComplete,
      true,
      this.config.timeZone
    );
  }

  get isEnabled() {
    return this.config.enabled;
  }

  async onTick() {
    //TODO: Error handling
    // const tasks = await redis.set("tasks/unscheduled", "value");
    // Load tasks once into redis and consume these, only one instance is allowed to do this operation
    console.log("loging tasks");
    try {
      const tasks = await Task.find({
        active: true,
        deletedAt: undefined,
        nextExecutionAt: undefined,
      });
      console.log(tasks);
    } catch (e) {
      console.log(e);
    }
  }

  async onComplete() {}

  start() {
    this.cronService.start();
    this.running = true;
  }

  stop() {
    this.cronService.stop();
    this.running = false;
  }
}

export default new Scheduler();
