export async function httpPost(url: string): Promise<void> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json",
    },
    body: JSON.stringify({}),
  });
  if (!response.ok) {
    throw new Error("response not ok");
  }
}

export const httpPost$Logout = httpPost;
