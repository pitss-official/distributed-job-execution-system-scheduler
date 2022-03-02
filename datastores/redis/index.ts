import Datastore from "../interfaces/Datastores";
import { createClient } from "redis";

class Redis implements Datastore {
  name = "Redis";
  public isConnected: boolean;
  private readonly redisClient: any;

  constructor() {
    this.redisClient = createClient();
  }

  handleError(err) {
    //TODO: Migrate to error class for auto error segregation

    console.log("Redis Client Error", err);
  }

  async connect() {
    try {
      await this.redisClient.connect();

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

  async client() {
    if (!this.isConnected) {
      await this.connect();
    }

    return this.redisClient;
  }
}

// Singleton across process instance
export default new Redis();
