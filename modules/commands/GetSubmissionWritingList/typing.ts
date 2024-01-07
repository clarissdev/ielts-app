import { z } from "zod";

export const Params = z.object({
  graded: z.enum(["true", "false"]).transform((value) => value === "true")
});
export type Params = z.infer<typeof Params>;

export const Result = z
  .object({
    submissionId: z.string()
  })
  .array();
export type Result = z.infer<typeof Result>;

export type GetSubmissionWritingList$Params = Params;
export const GetSubmissionWritingList$Params = Params;
export type GetSubmissionWritingList$Result = Result;
export const GetSubmissionWritingList$Result = Result;

export function getResourseKey$GetSubmissionWritingList(params: Params) {
  return ["9f31499a-19fe-48e9-9515-fbacaf1041b6", params];
}
