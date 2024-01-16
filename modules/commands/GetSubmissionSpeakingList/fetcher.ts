import { Params, Result } from "./typing";

export async function httpGet$GetSubmissionSpeakingList(
  url: string,
  params: Params
) {
  const response = await fetch(
    `${url}?${new URLSearchParams({ graded: params.graded.toString() })}`,
    {
      method: "GET"
    }
  );
  const text = await response.text();
  const data = JSON.parse(text);
  const result = Result.parse(data);
  return result;
}
