import { z } from "zod";

import { ContentType, ImageFileHandle } from "@/modules/business-types";

export const Params = z.object({
  contentType: ContentType
});
export type Params = z.infer<typeof Params>;

export const Result = z.object({
  file: ImageFileHandle,
  presignedUrl: z.string()
});

export type Result = z.infer<typeof Result>;
export type UploadFile$Params = Params;
export const UploadFile$Params = Params;
export type UploadFile$Result = Result;
export const UploadFile$Result = Result;
