"use client";

import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserValidation } from "@/lib/validations/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getPublicKey, getWalletId } from "@/lib/crypto/wallet";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.action";

export default function Auth() {
  const [privateKeyValue, setPrivateKeyValue] = useState("");
  const [walletIdValue, setWalletIdValue] = useState("");
  const router = useRouter();

  const formSchema = z.object({
    public_key: z.string().min(1),
    walletid: z.string().min(1),
    name: z.string().min(1),
    balance: z.number().int().min(0),
  });

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      public_key: "",
      walletid: "",
      name: "",
      balance: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateUser({
      public_key: getPublicKey(privateKeyValue) || "",
      walletid: getWalletId(getPublicKey(privateKeyValue) || ""),
      name: values.name,
      balance: values.balance,
    });

    router.replace(
      `/root/wallet/${getWalletId(getPublicKey(privateKeyValue) || " ") || ""}`
    );
  };

  //TODO: ENSURE USER TO NOT LEAVE SPACE AHEAD OF THE PRIVATE KEY

  return (
    <div className="form h-screen flex items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 border w-1/4 m-auto p-8"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="public_key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Private Key</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Private Key"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e); // This ensures form control is updated
                      setPrivateKeyValue(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallet Balance</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Balance"
                    {...field}
                    onChange={(e) => {
                      const numericValue = Number(e.target.value);
                      field.onChange(numericValue);
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
