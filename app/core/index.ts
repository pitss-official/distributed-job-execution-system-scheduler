import chalk from "chalk";
import scheduler from "./scheduler";
import datastores from "../../datastores";

class Core {
  protected static taskExecutionRegister = new Map();

  public static registerTask(ClassName, instance) {}

  handleError() {}

  handleSuccess() {}

  service() {}

  serve() {}

  async start() {
    //Todo: Implement logger class that reports sys metrics and logs
    const log = console.log;
    try {
      log(chalk.bgGray("Initializing Datastores"));

      for (const key in datastores) {
        const datastore = datastores[key].default;

        await datastore.connect();

        log(chalk.green("✓ Initializing " + datastore.name));
      }

      log(chalk.bgGray("Starting core services"));
      log(chalk.green("✓ Starting Scheduler"));
      scheduler.start();
      log(chalk.green("✓ Starting Assigner"));
    } catch (e) {
      log(chalk.bgRed("Failed to start"));
      this.shutdown();
    }
  }

  async shutdown() {
    const log = console.log;

    await scheduler.stop();

    log(chalk.bgYellow("Shutting down"));
  }
}

export default new Core();
