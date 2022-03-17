//TODO: Improvement: cut down scheduler based on user Ids
import Task from "../../../../models/Task";
import cron from "cron";
import config from "config";
import CoreService from "../../interfaces/CoreService";
import redlock from "../../../../utils/red-lock";

class Scheduler implements CoreService {
  private readonly cronService;
  private readonly config = config.get("system.core.services.scheduler");
  private running = false;
  readonly name = "Scheduler";
  readonly type = "CoreService";

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

  onTick = async () => {
    //TODO: Error handling
    // const tasks = await redis.set("tasks/unscheduled", "value");
    // Load tasks once into redis and consume these, only one instance is allowed to do this operation
    try {
      const lockDuration = config.get("system.lock.duration");

      await redlock.using(
        ["core_service_scheduler"],
        lockDuration,
        async (signal) => {
          // Make sure any attempted lock extension has not failed.
          if (signal.aborted) {
            throw signal.error;
          }

          const tasks = await Task.find({
            active: true,
            deletedAt: undefined,
            nextExecutionAt: undefined,
          });

          tasks.forEach((task) => {
            console.log(task.score);
          });

          console.log(tasks);
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  async onComplete() {}

  async start() {
    this.cronService.start();
    this.running = true;
  }

  async stop() {
    this.cronService.stop();
    this.running = false;
  }

  //TODO: Change this to an event stream
  on = (event) => new Promise((resolve, reject) => {});
}

export default new Scheduler();
