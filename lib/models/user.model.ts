import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  public_key: { type: String, required: true },
  name: { type: String, required: true },
  walletid: { type: String, required: true },
  balance: { type: Number },
});

const User = mongoose.models.User || mongoose.model("User", userSchema); //if the model is already created, use it, else create a new one

export default User;
