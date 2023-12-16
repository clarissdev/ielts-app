import { Exam } from "@/modules/business-types";
import { z } from "zod";

export const Params = z.object({
  createdBy: z.string().optional(),
  year: z.coerce.number().optional(),
  searchQuery: z.string().optional(),
  offset: z.coerce.number(),
  limit: z.coerce.number(),
});
export type Params = z.infer<typeof Params>;

export const Result = z.object({
  exams: Exam.array(),
  count: z.number(),
});
export type Result = z.infer<typeof Result>;

export const GetExamList$Params = Params;
export type GetExamList$Params = Params;
export const GetExamList$Result = Result;
export type GetExamList$Result = Result;

export function getResourceKey$GetExamList(params: Params) {
  return ["6769d49b-5ebf-4984-b26e-33f40b4bb37d", params];
}
