import { z } from "zod";

import { SpeakingExam } from "@/modules/business-types";

export const Params = z.object({
  examId: z.string()
});

export type Params = z.infer<typeof Params>;
export const Result = SpeakingExam;
export type Result = SpeakingExam;

export type GetSpeakingExam$Params = Params;
export const GetSpeakingExam$Params = Params;
export type GetSpeakingExam$Result = Result;
export const GetSpeakingExam$Result = Result;
