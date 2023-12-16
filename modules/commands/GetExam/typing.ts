import { ReadingExam, WritingExam } from "@/modules/business-types";
import { z } from "zod";

export const Params = z.object({
  examId: z.string(),
});
export type Params = z.infer<typeof Params>;
export const Result = z.object({
  title: z.string(),
  year: z.number(),
  readingExam: ReadingExam.shape.tasks,
  writingExam: WritingExam.shape.tasks,
});
export type Result = z.infer<typeof Result>;

export type GetExam$Params = Params;
export const GetExam$Params = Params;
export type GetExam$Result = Result;
export const GetExam$Result = Result;
