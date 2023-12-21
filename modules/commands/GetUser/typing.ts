import { z } from "zod";

import { User } from "@/modules/business-types";

export const Params = z.object({
  userId: z.string()
});
export type Params = z.infer<typeof Params>;

export const Result = User;
export type Result = User;
