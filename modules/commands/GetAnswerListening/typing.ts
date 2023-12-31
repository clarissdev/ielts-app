import { z } from "zod";

export const Params = z.object({
  examId: z.string()
});

export type Params = z.infer<typeof Params>;

export const Result = z.object({
  answerId: z.string(),
  examId: z.string(),
  answers: z.record(z.string().startsWith("question_"), z.string().array())
});

export type Result = z.infer<typeof Result>;

export type GetAnswerListening$Params = Params;
export const GetAnswerListening$Params = Params;
export type GetAnswerListening$Result = Result;
export const GetAnswerListening$Result = Result;
