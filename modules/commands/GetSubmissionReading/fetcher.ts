import { Params, Result } from "./typing";

export async function httpGet$GetSubmissionReading(
  url: string,
  params: Params
) {
  const response = await fetch(`${url}?${new URLSearchParams(params)}`, {
    method: "GET"
  });
  const text = await response.text();
  const data = JSON.parse(text);
  const result = Result.parse(data);
  return result;
}

export function getResourceKey$GetSubmissionReading(params: Params) {
  return ["0ab0b773-843f-46d7-a0ad-ad39b809e2dd", params];
}
