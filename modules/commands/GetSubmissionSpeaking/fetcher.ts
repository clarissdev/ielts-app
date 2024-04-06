import { Params, Result } from "./typing";

export async function httpGet$GetSubmissionSpeaking(
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

export function getResourceKey$GetSubmissionSpeaking(params: Params) {
  return ["78a27873-17c0-4040-b810-e2ca1b2702bf", params];
}
