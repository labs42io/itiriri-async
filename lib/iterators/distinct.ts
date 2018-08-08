import { asyncIterable } from '../utils/asyncIterable';

export function distinct<TElement, TKey>(
  source: AsyncIterable<TElement>,
  keySelector: (element: TElement) => TKey,
): AsyncIterable<TElement> {
  return asyncIterable(async function* () {
    const set = new Set<TKey>();

    for await (const element of source) {
      const key = keySelector(element);

      if (!set.has(key)) {
        set.add(key);
        yield await Promise.resolve(element);
      }
    }
  });
}
