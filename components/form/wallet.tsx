// "use client";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserValidation } from "@/lib/validations/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUser, updateUser } from "@/lib/actions/user.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default async function Wallet({ walletid }: { walletid: string }) {
  const user = await fetchUser(walletid);
  return (
    <div className="form h-screen w-3/5 flex items-center justify-end  px-10 ">
      <div className={`wallet  border p-14 md:w-90 xl:w-3/5 `}>
        <h1 className="text-2xl font-semibold mb-3">Wallet</h1>
        <div className="name">
          <h3 className="text-md font-medium ">User Name</h3>
          <Input className="name mt-2 mb-3" value={user?.name} readOnly />
        </div>
        <div className="wallet_id ">
          <h3 className="text-md font-medium ">Wallet ID</h3>

          <Input
            className="walletid mt-2 mb-3"
            value={user?.walletid}
            readOnly
          />
        </div>
        <div className="balance ">
          <h3 className="text-md font-medium ">Balance</h3>
          <Input
            className="walletid mt-2 mb-3"
            value={user?.balance}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
