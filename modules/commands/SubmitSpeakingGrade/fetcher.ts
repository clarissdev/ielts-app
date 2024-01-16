import {
  SubmitSpeakingGrade$Params,
  SubmitSpeakingGrade$Result
} from "./typing";

export async function httpPost(
  url: string,
  params: SubmitSpeakingGrade$Params
) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params)
  });
  const text = await response.text();
  const data = JSON.parse(text);
  const result = SubmitSpeakingGrade$Result.parse(data);
  return result;
}

export const httpPost$SubmitSpeakingGrade = httpPost;
