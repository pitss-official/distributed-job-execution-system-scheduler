"use strict";

import mongoose from "mongoose";
import userSchema from "../../schemas/user";

const UserModel = mongoose.model("User", userSchema);

export default class User extends UserModel {
  constructor(props: any) {
    super(props);
  }

  get isPremium() {
    return true;
  }
}
