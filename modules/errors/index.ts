type Options = ErrorOptions & { status?: number };

export class ClientError extends Error {
  reason: unknown;
  status: number;

  constructor(reason: unknown, options?: Options) {
    super(JSON.stringify(reason), options);
    this.reason = reason;
    this.status = options?.status ?? 400;
  }

  static assert(
    condition: unknown,
    reason: unknown,
    options?: Options
  ): asserts condition {
    if (!condition) throw new ClientError(reason, options);
  }

  static throws(reason: unknown, options?: Options): never {
    throw new ClientError(reason, options);
  }
}
