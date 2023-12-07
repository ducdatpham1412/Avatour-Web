const makeError = (
  error: string | Error | unknown | undefined,
  name?: string,
): (Error & { code?: number }) | undefined => {
  if (error === undefined) {
    return;
  }

  let err: Error;
  if (error instanceof Error) {
    err = error;
  } else {
    err = new Error(`${error}`);
  }

  return new Exception(err, err.name || name || '');
};

class Exception extends Error {
  constructor(error: Error, name?: string) {
    super(error.message, { cause: error.cause });
    this.name = name ?? error.name;
    this.stack = error.stack;
  }
}

export { makeError };
