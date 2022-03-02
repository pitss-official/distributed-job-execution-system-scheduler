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

      for (const datastore in datastores) {
        console.log(datastore, datastores);
        await datastores[datastore].default.connect();
        log(chalk.green("✓ Initializing " + datastores[datastore].name));
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

  shutdown() {
    const log = console.log;
    scheduler.stop();
    log(chalk.bgYellow("Shutting down"));
  }
}

export default new Core();
