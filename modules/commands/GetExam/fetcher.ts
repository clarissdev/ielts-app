import { GetExam$Params, GetExam$Result } from "./typing";

export async function httpGet$GetExam(url: string, { examId }: GetExam$Params) {
  const response = await fetch(`${url}?${new URLSearchParams({ examId })}`, {
    method: "GET",
  });
  const text = await response.text();
  const data = JSON.parse(text);
  const result = GetExam$Result.parse(data);
  return result;
}
