import S3 from "aws-sdk/clients/s3.js";
import { Db, ObjectId } from "mongodb";

import { Params, Result } from "./typing";

import { ContentType } from "@/modules/business-types";
import { SERVER_ENV } from "@/modules/env/server";

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

  const r2: S3 = new S3({
    endpoint: `https://${SERVER_ENV.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    accessKeyId: SERVER_ENV.AWS_ACCESS_KEY_ID,
    secretAccessKey: SERVER_ENV.AWS_SECRET_ACCESS_KEY,
    region: "apac",
    signatureVersion: "v4"
  });

  // allow the user to perform a PUT (upload) operation

  const file = await storeFileBlobDoc(db, { blobId, userId, contentType });

  const presignedUrl = await r2.getSignedUrlPromise("putObject", {
    Bucket: s3Bucket,
    Key: `blobs/${blobId}.wav`,
    ContentType: contentType,
    Expires: 3600
  });

  return {
    file,
    presignedUrl: presignedUrl
  };
}
