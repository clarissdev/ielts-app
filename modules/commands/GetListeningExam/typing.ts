import { z } from "zod";

import { ListeningExam } from "@/modules/business-types";

export const Params = z.object({
  examId: z.string()
});
export type Params = z.infer<typeof Params>;

export const Result = ListeningExam;
export type Result = ListeningExam;

export type GetListeningExam$Params = Params;
export const GetListeningExam$Params = Params;

export type GetListeningExam$Result = Result;
export const GetListeningExam$Result = Result;
