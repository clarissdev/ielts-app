import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { Db, ObjectId } from "mongodb";

import { Params, Result } from "./typing";

import { ContentType } from "@/modules/business-types";
import { SERVER_ENV } from "@/modules/env/server";

const UPLOAD_EXPIRES_SECONDS = 60 * 60;
const FILE_SIZE_LIMIT_BYTES = 300 * 1024 * 1024;

type Options = {
  db: Db;
  s3Bucket: string;
  userId: string;
};

type FileBlob$Params = {
  blobId: string;
  userId: string;
  contentType: ContentType;
};

export async function storeFileBlobDoc(
  db: Db,
  { blobId, userId, contentType }: FileBlob$Params
) {
  const createdAt = Date.now();

  await db.collection("blob").insertOne({
    _id: new ObjectId(blobId),
    createdAt,
    contentType
  });

  const file = {
    createdBy: userId,
    createdAt,
    blobId
  };
  const fileRes = await db.collection("file").insertOne(file);

  return {
    fileId: fileRes.insertedId.toHexString(),
    ...file,
    blob: { contentType, blobId, createdAt }
  };
}

export async function handler$UploadFile(
  { contentType }: Params,
  { db, s3Bucket, userId }: Options
): Promise<Result> {
  const blobId = new ObjectId().toHexString();
  const client = new S3Client({
    region: "ap-southeast-1",
    credentials: {
      accessKeyId: SERVER_ENV.AWS_ACCESS_KEY_ID,
      secretAccessKey: SERVER_ENV.AWS_SECRET_ACCESS_KEY
    }
  });

  const presignedPost = await createPresignedPost(client, {
    Bucket: s3Bucket,
    Key: `blobs/${blobId}`,
    Fields: { "Content-Type": contentType },
    Expires: UPLOAD_EXPIRES_SECONDS,
    Conditions: [["content-length-range", 1, FILE_SIZE_LIMIT_BYTES]]
  });

  const file = await storeFileBlobDoc(db, { blobId, userId, contentType });

  return {
    file,
    presignedPost
  };
}
