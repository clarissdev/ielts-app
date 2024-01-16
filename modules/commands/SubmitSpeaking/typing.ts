import { z } from "zod";

export const SubmitSpeaking$Params = z.object({
  examId: z.string(),
  answer: z.string().array().array()
});

export type SubmitSpeaking$Params = z.infer<typeof SubmitSpeaking$Params>;

export const SubmitSpeaking$Result = z.object({
  submissionId: z.string()
});
export type SubmitSpeaking$Result = z.infer<typeof SubmitSpeaking$Result>;
