import { z } from "zod";

export const ClientEnv = z.object({
  CLIENT_ID: z.string().endsWith(".apps.googleusercontent.com"),
});

export type ClientEnv = z.infer<typeof ClientEnv>;

export const CLIENT_ENV = ClientEnv.parse({
  CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
});
