import { Params, Result } from "./typing";

export async function httpGet$GetSubmissionWriting(
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

export function getResourceKey$GetSubmissionWriting(params: Params) {
  return ["06c71a67-b7c2-485b-9cb2-5cfb37706e52", params];
}
