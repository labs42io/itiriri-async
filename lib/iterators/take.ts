import { asyncIterable } from '../utils/asyncIterable';

export function take<TElement>(
  source: AsyncIterable<TElement>,
  count: number,
): AsyncIterable<TElement> {
  if (count < 0) {
    throw Error('Negative count is not supported, use await and sync iterator instead.');
  }

  return asyncIterable(async function* () {
    let n = count;

    for await (const element of source) {
      if (n-- === 0) return;

      yield await Promise.resolve(element);
    }
  });
}
