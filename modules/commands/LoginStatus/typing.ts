import { z } from "zod";

export const Result = z.union([
  z.object({
    loggedIn: z.literal(true),
    userId: z.string(),
    displayName: z.string(),
    isAgent: z.boolean(),
    email: z.string()
  }),
  z.object({
    loggedIn: z.literal(false)
  })
]);

export type Result = z.infer<typeof Result>;

export const Token = z.object({
  userId: z.string()
});

export type Token = z.infer<typeof Token>;

export type LoginStatus$Result = Result;
export const LoginStatus$Result = Result;
