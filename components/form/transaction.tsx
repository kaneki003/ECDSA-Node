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
import { makeTransaction, updateUser } from "@/lib/actions/user.action";
import { TransactionValidation } from "@/lib/validations/transaction";
import { useToast } from "@/components/ui/use-toast"



export default function Transaction({from}:{from:string}) {
  const { toast } = useToast()
  const sender = from;
//   console.log(sender);

  const formSchema = z.object({
    
    walletid: z.string().min(1),
    amount: z.number().min(0),
  });

  const form = useForm({
    resolver: zodResolver(TransactionValidation),
    defaultValues: {
        walletid: "",
        amount: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const message=await makeTransaction({
        from: sender,
        to: values.walletid,
        amount: values.amount
      });
    
      toast({
        title: message?message:"Error making transaction..",
      }) 

  };

  //TODO: ENSURE USER TO NOT LEAVE SPACE AHEAD OF THE PRIVATE KEY

  return (
    <div className="form w-1/2  p-10  h-screen flex  items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 border w-1/2  p-8"
        >
            {/* <h1 className="font-semibold">Make Transaction</h1> */}
          <FormField
            control={form.control}
            name="walletid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reciever Wallet ID</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Wallet ID"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Amount</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Amount"
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
