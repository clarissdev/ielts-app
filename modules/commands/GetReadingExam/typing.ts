import { ReadingExam } from "@/modules/business-types";
import { z } from "zod";

export const Params = z.object({
  examId: z.string(),
});

export type Params = z.infer<typeof Params>;
export const Result = ReadingExam;
export type Result = ReadingExam;

export type GetReadingExam$Params = Params;
export const GetReadingExam$Params = Params;
export type GetReadingExam$Result = Result;
export const GetReadingExam$Result = Result;
