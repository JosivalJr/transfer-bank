export function isArray(value: unknown): value is Array<unknown> {
  return Boolean(value) && Array.isArray(value);
}

export function isRepeatedArray<T>(value: Array<T>): boolean {
  return value.every((item) => value[0] === item);
}
