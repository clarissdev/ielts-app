import { z } from "zod";

import { UnixTimestamp } from "@/modules/business-types";

export const Params = z
  .object({
    examId: z.string().optional(),
    submissionId: z.string().optional(),
    createdBy: z.string().optional()
  })
  .refine(
    (data) => !!data.submissionId || (!!data.examId && !!data.createdBy),
    "must have submissionId or createdBy"
  );
export type Params = z.infer<typeof Params>;

export const Result = z.object({
  submissionId: z.string(),
  examId: z.string(),
  createdBy: z.string(),
  createdAt: UnixTimestamp,
  answer: z.string().array(),
  grade: z.number().optional()
});
export type Result = z.infer<typeof Result>;

export type GetSubmissionReading$Params = Params;
export const GetSubmissionReading$Params = Params;

export type GetSubmissionReading$Result = Result;
export const GetSubmissionReading$Result = Result;
