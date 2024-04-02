import { Params, Result } from "./typing";

export async function httpGet$GetSubmissionSat(url: string, params: Params) {
  const response = await fetch(`${url}?${new URLSearchParams(params)}`, {
    method: "GET"
  });
  const text = await response.text();
  const data = JSON.parse(text);
  const result = Result.parse(data);
  return result;
}
