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

  err.name = err.name || name || '';

  return err;
};

export { makeError };
