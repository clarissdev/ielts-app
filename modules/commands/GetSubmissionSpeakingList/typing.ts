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

export type GetSubmissionSpeakingList$Params = Params;
export const GetSubmissionSpeakingList$Params = Params;
export type GetSubmissionSpeakingList$Result = Result;
export const GetSubmissionSpeakingList$Result = Result;

export function getResourseKey$GetSubmissionSpeakingList(params: Params) {
  return ["a9e8b24d-9026-471b-b3ac-6635b9d9a4cd", params];
}
