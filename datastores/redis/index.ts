import Datastore from "../interfaces/Datastores";
import ioredis from "ioredis";
import config from "config";

class Redis implements Datastore {
  name = "Redis";
  public isConnected: boolean;
  readonly client = new ioredis(config.get("dataStores.redis"));

  handleError(err) {
    //TODO: Migrate to error class for auto error segregation

    console.log("Redis Client Error", err);
  }

  async connect() {
    try {
      this.client.set(this.name, new Date().valueOf());

      this.isConnected = true;
    } catch (e) {
      this.handleError(e);
      this.isConnected = false;

      throw e;
    }

    return this.isConnected;
  }

  async shutdown() {
    this.isConnected = false;
  }
}

// Singleton across process instance
export default new Redis();
