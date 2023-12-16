import { WritingExam } from "@/modules/business-types";
import { z } from "zod";

export const Params = z.object({
  examId: z.string(),
});

export type Params = z.infer<typeof Params>;
export const Result = WritingExam;
export type Result = WritingExam;

export type GetWritingExam$Params = Params;
export const GetWritingExam$Params = Params;
export type GetWritingExam$Result = Result;
export const GetWritingExam$Result = Result;
