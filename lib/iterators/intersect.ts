import { asyncIterable } from '../utils/asyncIterable';
import { map } from 'itiriri/iterators/map';
import { toSet } from 'itiriri/reducers/toSet';

export function intersect<TElement, TKey>(
  source: AsyncIterable<TElement>,
  others: Iterable<TElement>,
  selector: (element: TElement) => TKey,
): AsyncIterable<TElement> {
  return asyncIterable(async function* () {
    const includedSet = new Set<TKey>();
    const othersSet = toSet(map(others, selector));

    for await (const element of source) {
      const key = selector(element);

      if (!includedSet.has(key) && othersSet.has(key)) {
        includedSet.add(key);
        yield await Promise.resolve(element);
      }
    }
  });
}
