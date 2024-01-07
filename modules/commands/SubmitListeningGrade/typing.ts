import { z } from "zod";

export const SubmitListeningGrade$Params = z.object({
  submissionId: z.string(),
  grade: z.number()
});

export type SubmitListeningGrade$Params = z.infer<
  typeof SubmitListeningGrade$Params
>;

export const SubmitListeningGrade$Result = z.object({
  submissionId: z.string()
});
export type SubmitListeningGrade$Result = z.infer<
  typeof SubmitListeningGrade$Result
>;
