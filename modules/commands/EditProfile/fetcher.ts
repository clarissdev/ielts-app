import { EditProfile$Params, EditProfile$Result } from "./typing";

export async function httpPost(url: string, params: EditProfile$Params) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params)
  });
  const text = await response.text();
  const data = JSON.parse(text);
  const result = EditProfile$Result.parse(data);
  return result;
}

export const httpPost$EditProfile = httpPost;
