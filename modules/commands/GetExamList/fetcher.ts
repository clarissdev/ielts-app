import { Params, Result } from "./typing";

export async function httpGet(url: string, params?: Partial<Params>) {
  if (params) {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value == null) continue;
      search.append(key, value.toString());
    }
    url += "?" + search.toString();
  }

  const response = await fetch(url, { method: "GET" });
  const text = await response.text();
  const data = JSON.parse(text);
  const result = Result.parse(data);
  return result;
}

export const httpGet$GetExamList = httpGet;

export function getResourceKey$GetExamList(params?: Partial<Params>) {
  return ["10a0782b-c3a2-4d7e-871a-cd316e49ea51", params];
}
