export const assertPromiseFulfilledResult = <T>(
  promiseSettledResult: PromiseSettledResult<T>
): promiseSettledResult is PromiseFulfilledResult<T> => {
  return promiseSettledResult.status === "fulfilled";
};
