import { z } from "zod";

import { UnixTimestamp } from "@/modules/business-types";

export const Params = z
  .object({
    submissionId: z.string().optional(),
    createdBy: z.string().optional()
  })
  .refine(
    (data) => !!data.submissionId || !!data.createdBy,
    "must have submissionId or createdBy"
  );
export type Params = z.infer<typeof Params>;

export const Result = z.object({
  submissionId: z.string(),
  examId: z.string(),
  createdBy: z.string(),
  createdAt: UnixTimestamp,
  answer: z.string().array().array(),
  grade: z.number().optional(),
  description: z.string().optional()
});
export type Result = z.infer<typeof Result>;

export type GetSubmissionSpeaking$Params = Params;
export const GetSubmissionSpeaking$Params = Params;

export type GetSubmissionSpeaking$Result = Result;
export const GetSubmissionSpeaking$Result = Result;
