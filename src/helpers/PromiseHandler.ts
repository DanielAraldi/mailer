export async function PromiseHandler<T = any>(
  promise: Promise<T>
): Promise<T | Error> {
  return await promise.then((data: T) => data).catch((error: Error) => error);
}
