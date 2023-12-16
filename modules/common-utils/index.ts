import nProgress from "nprogress";
import { mutate } from "swr";
import { ImageFileHandle } from "../business-types";
import { CLIENT_ENV } from "../env/client";

// TODO: @kien-kreate: nprogress does not use lock counting, fix this
export async function shamelesslyRevalidateEverything() {
  nProgress.start();
  try {
    await mutate(() => true);
  } finally {
    nProgress.done();
  }
}

export function getSrcFromImageFileHandle(value: ImageFileHandle) {
  return `https://${CLIENT_ENV.CLOUDFRONT_HOST}/blobs/${value.blob.blobId}`;
}
