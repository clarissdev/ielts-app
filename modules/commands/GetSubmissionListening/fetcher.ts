import { Params, Result } from "./typing";

export async function httpGet$GetSubmissionListening(
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

export function getResourceKey$GetSubmissionListening(params: Params) {
  return ["1974cc72-0197-453c-b78c-6d13d08f25b6", params];
}
