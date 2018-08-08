export function asyncIterator<T>(source: AsyncIterable<T>): AsyncIterator<T> {
  return source[Symbol.asyncIterator]();
}
