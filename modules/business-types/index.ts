import { z } from "zod";

export const UnixTimestamp = z.number().max(2199023255551); // milliseconds
export type UnixTimestamp = z.infer<typeof UnixTimestamp>;

export const BlobId = z.string();
export type BlobId = z.infer<typeof BlobId>;

export const CONTENT_TYPE = {
  image: ["image/jpg", "image/jpeg", "image/png", "image/webp"],
  audio: ["audio/wav", "audio/webm"]
} as const;

export const ContentType = z.enum([
  ...CONTENT_TYPE.audio,
  ...CONTENT_TYPE.image
]);

export type ContentType = z.infer<typeof ContentType>;

export const FileId = z.string();
export type FileId = z.infer<typeof FileId>;

// BlobHandle - a blob id and its metadata
export const ImageBlobHandle = z.object({
  blobId: BlobId, // primary key
  createdAt: UnixTimestamp,
  contentType: ContentType,
  size: z.number().optional(), // bytes - content size
  width: z.number().optional(), // pixels - image natural width
  height: z.number().optional() // pixels - image natural height
});

export type ImageBlobHandle = z.infer<typeof ImageBlobHandle>;

// FileHandle - an BlobHandle with alternative versions
export const ImageFileHandle = z.object({
  fileId: FileId, // primary key
  createdAt: UnixTimestamp,
  createdBy: z.string(),
  blob: ImageBlobHandle
});

export type ImageFileHandle = z.infer<typeof ImageFileHandle>;

export const User = z.object({
  authenticator: z.literal("Google"),
  userId: z.string(),
  createdAt: UnixTimestamp,
  updatedAt: UnixTimestamp.nullish(),
  displayName: z.string().nullish(),
  isAgent: z.boolean()
});
export type User = z.infer<typeof User>;

export const WritingExam = z.object({
  examId: z.string(),
  tasks: z.string().array()
});
export type WritingExam = z.infer<typeof WritingExam>;

export const ReadingExam = z.object({
  examId: z.string(),
  tasks: z
    .object({
      readingContent: z.string(),
      questionContent: z.string(),
      numQuestions: z.number()
    })
    .array()
});
export type ReadingExam = z.infer<typeof ReadingExam>;

export const ListeningExam = z.object({
  examId: z.string(),
  listeningSrc: z.string(),
  tasks: z
    .object({
      questionContent: z.string(),
      numQuestions: z.number()
    })
    .array()
});

export type ListeningExam = z.infer<typeof ListeningExam>;

export const SpeakingExam = z.object({
  examId: z.string(),
  tasks: z.string().array().array()
});

export type SpeakingExam = z.infer<typeof SpeakingExam>;
