import { ReadingExam, WritingExam } from "@/modules/business-types";
import { z } from "zod";

export const Params = z.object({
  examId: z.string(),
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

export type EditExam$Params = Params;
export const EditExam$Params = Params;
export type EditExam$Result = Result;
export const EditExam$Result = Result;
