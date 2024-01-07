import { z } from "zod";

export const SubmitReadingGrade$Params = z.object({
  submissionId: z.string(),
  grade: z.number()
});

export type SubmitReadingGrade$Params = z.infer<
  typeof SubmitReadingGrade$Params
>;

export const SubmitReadingGrade$Result = z.object({
  submissionId: z.string()
});
export type SubmitReadingGrade$Result = z.infer<
  typeof SubmitReadingGrade$Result
>;
