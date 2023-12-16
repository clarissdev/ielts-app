import { Params, Result } from "./typing";

export async function httpGet$GetWritingExam(url: string, { examId }: Params) {
  const response = await fetch(`${url}?${new URLSearchParams({ examId })}`, {
    method: "GET",
  });
  const text = await response.text();
  const data = JSON.parse(text);
  const result = Result.parse(data);
  return result;
}
