export type BodyInit = Blob | FormData | URLSearchParams | string;

export class UploadError extends Error {}
export class UploadAbort extends Error {}

export type Progress = {
  loaded?: number;
  total?: number;
  abort?: () => void;
} | null;

export type Options = {
  onProgress: (progress: Progress) => void;
};

export function uploadWithProgress(
  url: string,
  body: BodyInit,
  options: Options
): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", (event) => {
      options?.onProgress({
        loaded: event.lengthComputable ? event.loaded : undefined,
        total: event.lengthComputable ? event.total : undefined,
        abort: () => xhr.abort()
      });
    });
    xhr.addEventListener("load", () => {
      options?.onProgress(null);
      resolve(new Response(xhr.response || null, { status: xhr.status }));
    });
    xhr.addEventListener("error", (event) => {
      options?.onProgress(null);
      reject(new UploadError("upload failed", { cause: event }));
    });
    xhr.addEventListener("abort", (event) => {
      options?.onProgress(null);
      reject(new UploadAbort("upload aborted", { cause: event }));
    });
    xhr.open("PUT", url);
    xhr.send(body);
  });
}

export type Ratio = number; // 0.0 .. 1.0

export function toRatio(
  progress: Progress | null | undefined
): Ratio | undefined {
  if (!progress) return undefined;
  const { loaded, total } = progress;
  if (loaded == null || total == null) return undefined;
  if (isNaN(total) || total == 0) return undefined;
  return loaded / total;
}
