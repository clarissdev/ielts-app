import { Params, Result } from "./typing";

export async function httpGet$GetAnswerListening(
  url: string,
  { examId }: Params
) {
  const response = await fetch(`${url}?${new URLSearchParams({ examId })}`, {
    method: "GET"
  });
  const text = await response.text();
  const data = JSON.parse(text);
  const result = Result.parse(data);
  return result;
}
