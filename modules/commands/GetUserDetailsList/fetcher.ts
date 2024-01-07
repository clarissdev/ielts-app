import { Result } from "./typing";

export async function httpGet$GetUserDetailsList(url: string) {
  const response = await fetch(url, {
    method: "GET"
  });
  const text = await response.text();
  const data = JSON.parse(text);
  const result = Result.parse(data);
  return result;
}
