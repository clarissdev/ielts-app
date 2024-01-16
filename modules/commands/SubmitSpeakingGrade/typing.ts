import { z } from "zod";

export const SubmitSpeakingGrade$Params = z.object({
  submissionId: z.string(),
  grade: z.number(),
  description: z.string()
});

export type SubmitSpeakingGrade$Params = z.infer<
  typeof SubmitSpeakingGrade$Params
>;

export const SubmitSpeakingGrade$Result = z.object({
  submissionId: z.string()
});
export type SubmitSpeakingGrade$Result = z.infer<
  typeof SubmitSpeakingGrade$Result
>;
