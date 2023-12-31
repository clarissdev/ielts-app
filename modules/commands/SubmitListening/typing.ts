import { z } from "zod";

export const SubmitListening$Params = z.object({
  examId: z.string(),
  answer: z.string().array()
});

export type SubmitListening$Params = z.infer<typeof SubmitListening$Params>;

export const SubmitListening$Result = z.object({
  submissionId: z.string()
});
export type SubmitListening$Result = z.infer<typeof SubmitListening$Result>;
