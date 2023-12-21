import { Params, Result } from "./typing";

export async function httpPost$AuthenticateByGoogle(
  url: string,
  params: Params
): Promise<Result> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json"
    },
    body: JSON.stringify(params)
  });
  if (!response.ok) {
    throw new Error("response not ok");
  }
  const text = await response.text();
  const data = JSON.parse(text);
  const result = Result.parse(data);
  return result;
}
