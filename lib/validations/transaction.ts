import * as z from "zod";

export const TransactionValidation = z.object({
  walletid: z.string().min(1),
  amount: z.number().min(0),
});
