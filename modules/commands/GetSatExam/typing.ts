import { z } from "zod";

import { SatExam } from "@/modules/business-types";

export const Params = z.object({
  examId: z.string()
});

export type Params = z.infer<typeof Params>;
export const Result = SatExam;
export type Result = SatExam;

export type GetSatExam$Params = Params;
export const GetSatExam$Params = Params;
export type GetSatExam$Result = Result;
export const GetSatExam$Result = Result;
