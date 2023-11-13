export default async function promiseHandler<T = any, E = any>(
  promise: Promise<T>
) {
  try {
    return [await promise, null] as const;
  } catch (error) {
    return [null, error as E] as const;
  }
}
