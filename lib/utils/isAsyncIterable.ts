export function isAsyncIterable<T>(item: any): item is AsyncIterable<T> {
  return typeof (<AsyncIterable<T>>item)[Symbol.asyncIterator] === 'function';
}
