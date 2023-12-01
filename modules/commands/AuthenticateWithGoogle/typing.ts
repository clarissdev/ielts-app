import { z } from "zod";

export const Params = z.object({
  credential: z.string(), // google token
});

export type Params = z.infer<typeof Params>;

export const Result = z.object({
  userId: z.string(), // google userid
});

export type Result = z.infer<typeof Result>;

export type AuthenticateByGoogle$Params = Params;
export const AuthenticateByGoogle$Params = Params;
export type AuthenticateByGoogle$Result = Result;
export const AuthenticateByGoogle$Result = Result;
