import config from "config";
import mongoose from "mongoose";
import Datastore from "../interfaces/Datastores";

class MongoDB implements Datastore {
  name = "MongoDB";
  isConnected: boolean;

  private static get uri() {
    return config.get("dataStores.mongoDB.URI");
  }

  async connect() {
    try {
      await mongoose.connect(MongoDB.uri);

      this.isConnected = true;
    } catch (e) {
      this.isConnected = false;

      throw e;
    }

    return this.isConnected;
  }

  async shutdown() {
    await mongoose.disconnect();
    this.isConnected = false;
  }
}

export default new MongoDB();
