import { z } from "zod";

export const Result = z
  .object({
    userId: z.string(),
    email: z.string(),
    displayName: z.string(),
    school: z.string().optional(),
    phoneNumber: z.string().optional(),

    // grade
    gradeListening: z.number().optional(),
    gradeReading: z.number().optional(),
    gradeWriting: z.number().optional(),
    gradeSpeaking: z.number().optional()
  })
  .array();
export type Result = z.infer<typeof Result>;

export type GetUserDetailsList$Result = Result;
export const GetUserDetailsList$Result = Result;

export function getResourceKey$GetUserDetailsList() {
  return ["2f5a10ed-bb30-4ffa-8014-f7b62d947307"];
}
