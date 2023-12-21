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

/**
 * Similar to Python's range function.
 *
 * This function returns an array containing integers from `start` (inclusive)
 * to `stop` (exclusive). In case that the second parameter is not defined,
 * `range(n)` is equivalent to `range(0, n)`.
 *
 * For examples:
 * - `range(5) = [0,1,2,3,4]`
 * - `range(2,4) = [2,3]`
 */
export function range(start: number, stop?: number): number[] {
  if (stop == null) return range(0, start);
  const result: number[] = [];
  for (let value = start; value < stop; value += 1) {
    result.push(value);
  }
  return result;
}

export function getQuestionId(index: number) {
  return `question_${index < 10 ? "0" : ""}${index}`;
}

/**
 * Given an array of number of questions each tasks, return a list in which each item
 * is a list of question indexes corresponding to the task
 */
export function getQuestionIdsFromTasks(numQuestions: number[]): number[][] {
  const result: number[][] = [];
  let cur = 1;
  for (let i = 0; i < numQuestions.length; i++) {
    const questionIds: number[] = [];
    for (let j = 0; j < numQuestions[i]; j++) {
      questionIds.push(cur);
      cur += 1;
    }
    result.push(questionIds);
  }
  return result;
}
