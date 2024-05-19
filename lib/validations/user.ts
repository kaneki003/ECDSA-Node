import * as z from "zod";

export const UserValidation = z.object({
  public_key: z.string().min(1),
  walletid: z.string().min(1),
  name: z.string().min(1),
  balance: z.number().int().min(0),
});