import { z } from "zod";

export const SubmitWritingGrade$Params = z.object({
  submissionId: z.string(),
  grade: z.number(),
  description: z.string()
});

export type SubmitWritingGrade$Params = z.infer<
  typeof SubmitWritingGrade$Params
>;

export const SubmitWritingGrade$Result = z.object({
  submissionId: z.string()
});
export type SubmitWritingGrade$Result = z.infer<
  typeof SubmitWritingGrade$Result
>;
