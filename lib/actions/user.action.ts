"use server";

import User from "../models/user.model";
import { connecTtoDB } from "../mongoose";

export async function updateUser({
  public_key,
  walletid,
  name,
  balance,
}: {
  public_key: string;
  walletid: string;
  name: string;
  balance: number;
}): Promise<void> {
  try {
    connecTtoDB();
    await User.findOneAndUpdate(
      {
        walletid: walletid, //find the user by walletid
      },
      {
        public_key: public_key,
        walletid: walletid,
        name: name,
        balance: balance,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.log("Error updating user..", error);
  }
}

export async function fetchUser(walletid: string) {
  try {
    connecTtoDB();

    const user = await User.findOne({ walletid: walletid });

    return user;
  } catch (error) {
    console.log("Error fetching user..", error);
  }
}

export async function makeTransaction({
  from,
  to,
  amount,
}: {
  from: string;
  to: string;
  amount: number;
}) {
  try {
    connecTtoDB();

    const sender = await User.findOne({ walletid: from });

    if (sender.balance < amount) {
      return "Insufficient balance";
    }

    await User.findOneAndUpdate(
      { walletid: from },
      { $inc: { balance: -amount } }
    );
    await User.findOneAndUpdate(
      { walletid: to },
      { $inc: { balance: amount } }
    );

    return "Transaction successful";
  } catch (error) {
    console.log("Error making transaction..", error);
  }
}
