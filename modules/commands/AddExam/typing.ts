import { ReadingExam, WritingExam } from "@/modules/business-types";
import { z } from "zod";

export const Params = z.object({
  title: z.string(),
  year: z.number(),
  readingExam: ReadingExam.shape.tasks,
  writingExam: WritingExam.shape.tasks,
  // listeningExams: ListeningExam.pick({ tasks: true }),
});
export type Params = z.infer<typeof Params>;

export const Result = z.object({
  examId: z.string(),
});
export type Result = z.infer<typeof Result>;

export type AddExam$Params = Params;
export const AddExam$Params = Params;
export type AddExam$Result = Result;
export const AddExam$Result = Result;
