import { z } from "zod";

export const SubmitWriting$Params = z.object({
  examId: z.string(),
  answer: z.string().array()
});

export type SubmitWriting$Params = z.infer<typeof SubmitWriting$Params>;

export const SubmitWriting$Result = z.object({
  submissionId: z.string()
});
export type SubmitWriting$Result = z.infer<typeof SubmitWriting$Result>;
