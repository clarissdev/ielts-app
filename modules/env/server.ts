import { CLIENT_ENV, ClientEnv } from "./client";
import { z } from "zod";

export const ServerEnv = ClientEnv.extend({
  MONGODB_DBNAME: z.string().min(1),
  MONGODB_URI: z.string().startsWith("mongodb"),
  SECRET_KEY: z.string().min(36),
});
export type ServerEnv = z.infer<typeof ServerEnv>;

export const SERVER_ENV = ServerEnv.parse({
  ...CLIENT_ENV,
  MONGODB_URI:
    process.env.MONGODB_URI ||
    decodeURIComponent(process.env.MONGODB_URI__URLENCODED || ""),
  MONGODB_DBNAME: process.env.MONGODB_DBNAME,
  SECRET_KEY: process.env.SECRET_KEY,
});
