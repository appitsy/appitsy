// eslint-disable-next-line import/prefer-default-export
export const getBooleanOrDefault = (val: boolean | undefined, defaultVal: boolean) => {
  if (val === undefined) {
    return defaultVal;
  }

  return val;
};
