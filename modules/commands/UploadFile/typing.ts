import { ContentType, ImageFileHandle } from "@/modules/business-types";
import { PresignedPost } from "@aws-sdk/s3-presigned-post";
import { z } from "zod";

export const Params = z.object({
  contentType: ContentType,
});
export type Params = z.infer<typeof Params>;

export const PresignedPostSchema = z.object({
  url: z.string(),
  fields: z.record(z.string()),
});

export const Result = z.object({
  file: ImageFileHandle,
  presignedPost: PresignedPostSchema,
});

export type Result = {
  file: ImageFileHandle;
  presignedPost: PresignedPost;
};

export type UploadFile$Params = Params;
export const UploadFile$Params = Params;
export type UploadFile$Result = Result;
export const UploadFile$Result = Result;
