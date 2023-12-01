import { Result } from "./typing";

export async function httpGet(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const text = await response.text();
  const data = JSON.parse(text);
  const result = Result.parse(data);
  return result;
}

export function getResourceKey() {
  return ["e8c6440d-c1a1-4df3-887f-70c89e2d5d4a"];
}

export const httpGet$LoginStatus = httpGet;
export const getResourceKey$LoginStatus = getResourceKey;
