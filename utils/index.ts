export function formatFallback(
  obj: Record<string, unknown>
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  );
}

export function intentionallyIgnoreError(error: unknown) {
  console.warn(error);
  return undefined;
}
