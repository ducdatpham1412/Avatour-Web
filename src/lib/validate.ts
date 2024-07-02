export const validateIsEmail = (email: string) => {
  return !!email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

export const validatePassword = (pw: string) => {
  return (
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[^A-Za-z0-9]/.test(pw) &&
    !/\s/.test(pw) &&
    pw.length > 8
  );
};

export const validateName = (v: string) => v.length <= 100;

type ValidateNumberOptions = {
  isDecimal?: boolean;
};
export const validateIsNumber = (value: string | number, params?: ValidateNumberOptions) => {
  //   return /^[0-9]+$/.test(value);
  if (!params?.isDecimal) {
    return /^\d+?$/.test(String(value));
  }
  return /^\d+?$/.test(String(value)) || /^\d+(.(\d+)?)?$/.test(String(value));
};
