import { z } from "zod";

export const SubmitReading$Params = z.object({
  examId: z.string(),
  answer: z.string().array(),
});

export type SubmitReading$Params = z.infer<typeof SubmitReading$Params>;

export const SubmitReading$Result = z.object({
  submissionId: z.string(),
});
export type SubmitReading$Result = z.infer<typeof SubmitReading$Result>;
