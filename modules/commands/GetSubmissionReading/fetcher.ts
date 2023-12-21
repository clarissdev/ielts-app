import { Params, Result } from "./typing";

export async function httpGet$GetSubmissionReading(
  url: string,
  { submissionId }: Params
) {
  const response = await fetch(
    `${url}?${new URLSearchParams({ submissionId })}`,
    {
      method: "GET"
    }
  );
  const text = await response.text();
  const data = JSON.parse(text);
  const result = Result.parse(data);
  return result;
}
