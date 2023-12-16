import { ClientError } from "../errors";
import { NextResponse } from "next/server";

type Handler = () => Promise<void>;

export function withDefaultErrorHandler(handler: Handler): Handler {
  return async () => {
    try {
      await handler();
    } catch (error) {
      const name =
        error instanceof ClientError
          ? "ClientError"
          : error instanceof Error
          ? "Error"
          : "unknown";
      const status = error instanceof ClientError ? error.status : 500;
      const body =
        error instanceof ClientError
          ? error.reason
          : error instanceof Error
          ? error.message
          : null;

      console.error(name, error);
      NextResponse.json(body, { status: status });
    }
  };
}

export function extractSearchTerms(text: string) {
  const terms = text.match(/\S+/g) || [];
  return {
    tags: terms
      .filter((item) => item.startsWith("#"))
      .map((item) => item.replace("#", "")),
    searchTerms: terms.filter((item) => !item.startsWith("#")),
  };
}

export function assert(
  condition: unknown,
  message?: string
): asserts condition {
  if (!condition) throw new Error(message);
}
