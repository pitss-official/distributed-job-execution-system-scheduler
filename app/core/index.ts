import chalk from "chalk";
import scheduler from "./services/scheduler";
import datastores from "../../datastores";
import exitHook from "../../utils/exit-hook";
import redLock from "../../utils/red-lock";
import { ResourceLockedError } from "redlock";

class Core {
  protected static coreServiceRegister = new Map();
  //Todo: Implement logger class that reports sys metrics and logs
  protected log = console.log;

  public static registerService(instance) {
    this.coreServiceRegister.set(instance.name, {
      instance,
      isExecuted: false,
      isExecuting: false,
    });
  }

  async startService(identifier, { isExecuting, isExecuted, instance }) {
    const service = Core.coreServiceRegister.get(identifier);

    try {
      if (!isExecuted && !isExecuting) {
        service.isExecuting = true;

        if (!instance.isEnabled) {
          this.log(chalk.grey(`- Skipping ${instance.name}`));
          return;
        }

        this.log(chalk.yellow(`  ✓ Starting ${instance.name} service`));

        await instance.start();

        this.log(chalk.green(`  ✓ Started ${instance.name} service`));

        await instance.on("finish");

        this.log(chalk.yellow(`  ✓ Finished ${instance.name}`));

        service.isExecuting = false;
        service.isExecuted = true;
      }
    } catch (e) {
      this.handleError(instance, e);
      this.log(chalk.red(`❌ Couldn't execute ${instance.name}`), e);
    }
  }

  /**
   * Triggers execution of service from service register
   */
  executeAllServices() {
    for (const [identifier, service] of Core.coreServiceRegister) {
      this.startService(identifier, service);
    }
  }

  private registerEventListners() {
    redLock.on("error", (error) => {
      // Ignore cases where a resource is explicitly marked as locked on a client.
      if (error instanceof ResourceLockedError) {
        return;
      }

      // Log all other errors.
      this.log(chalk.red(error));
    });
  }

  handleError(instance, err) {}

  handleSuccess(instance) {}

  service() {
    this.start();

    exitHook(async () => {
      await this.shutdown();
    });
  }

  async start() {
    try {
      this.log(chalk.bgGray("\n Initializing Datastores"));

      for (const key in datastores) {
        const datastore = datastores[key].default;

        await datastore.connect();

        this.log(chalk.green("  ✓ Initializing " + datastore.name));
      }

      this.log(chalk.bgGray("\n Starting core services"));

      this.registerEventListners();
      this.executeAllServices();
    } catch (e) {
      this.log(chalk.bgRed("Failed to start"));
      await this.shutdown();
    }
  }

  async shutdown() {
    await scheduler.stop();

    this.log(chalk.bgYellow("\n Shutting down"));
  }
}

/**
 * Register core services for system execution
 */

Core.registerService(scheduler);

export default new Core();
