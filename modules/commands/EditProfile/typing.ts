import { z } from "zod";

export const EditProfile$Params = z.object({
  displayName: z.string()
});
export type EditProfile$Params = z.infer<typeof EditProfile$Params>;

export const EditProfile$Result = z.object({
  userId: z.string()
});
export type EditProfile$Result = z.infer<typeof EditProfile$Result>;
