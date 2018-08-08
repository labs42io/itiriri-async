import { asyncIterable } from '../utils/asyncIterable';

export function filter<TElement>(
  source: AsyncIterable<TElement>,
  predicate: (element: TElement, index: number) => boolean,
): AsyncIterable<TElement> {
  return asyncIterable(async function* () {
    let index = 0;

    for await (const element of source) {
      if (predicate(element, index++)) {
        yield await Promise.resolve(element);
      }
    }
  });
}
