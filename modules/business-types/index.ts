import { z } from "zod";

export const UnixTimestamp = z.number().max(2199023255551); // milliseconds
export type UnixTimestamp = z.infer<typeof UnixTimestamp>;

export const BlobId = z.string();
export type BlobId = z.infer<typeof BlobId>;

export const CONTENT_TYPE = {
  image: ["image/jpg", "image/jpeg", "image/png", "image/webp"],
  video: ["video/mp4"],
  text: ["text/html"],
} as const;

export const FileId = z.string();
export type FileId = z.infer<typeof FileId>;

// FileHandle - an BlobHandle with alternative versions

export const User = z.object({
  authenticator: z.literal("Google"),
  userId: z.string(),
  createdAt: UnixTimestamp,
  updatedAt: UnixTimestamp.nullish(),
  displayName: z.string().nullish(),
  isAgent: z.boolean(),
});
export type User = z.infer<typeof User>;

export const WritingExam = z.object({
  examId: z.string(),
  createdAt: UnixTimestamp,
  tasks: z
    .object({
      title: z.string(),
      image: z.string().nullish(),
    })
    .array(),
});
export type WritingExam = z.infer<typeof WritingExam>;

export const ListeningExam = z.object({
  examId: z.string(),
  createdAt: UnixTimestamp,
  tasks: z.object({
    title: z.string(),
  }),
});
