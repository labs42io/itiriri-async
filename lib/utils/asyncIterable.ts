import { asyncIterator } from './asyncIterator';

export function asyncIterable<TElement>(
  target: () => AsyncIterable<TElement>,
): AsyncIterable<TElement> {
  return {
    [Symbol.asyncIterator]() {
      return asyncIterator(target());
    },
  };
}
