import { CLIENT_ENV, ClientEnv } from "./client";
import { z } from "zod";

export const ServerEnv = ClientEnv.extend({
  MONGODB_DBNAME: z.string().min(1),
  MONGODB_URI: z.string().startsWith("mongodb"),
  SECRET_KEY: z.string().min(36),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  AWS_REGION: z.string().min(1),
  S3_BUCKET_NAME: z.string().min(1),
});
export type ServerEnv = z.infer<typeof ServerEnv>;

export const SERVER_ENV = ServerEnv.parse({
  ...CLIENT_ENV,
  MONGODB_URI:
    process.env.MONGODB_URI ||
    decodeURIComponent(process.env.MONGODB_URI__URLENCODED || ""),
  MONGODB_DBNAME: process.env.MONGODB_DBNAME,
  SECRET_KEY: process.env.SECRET_KEY,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
});
