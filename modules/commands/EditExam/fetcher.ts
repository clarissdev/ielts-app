import { EditExam$Params, EditExam$Result } from "./typing";

export async function httpPut(url: string, params: EditExam$Params) {
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  const text = await response.text();
  const data = JSON.parse(text);
  const result = EditExam$Result.parse(data);
  return result;
}

export const httpPut$EditExam = httpPut;
