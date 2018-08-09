import { asyncIterable } from '../utils/asyncIterable';
import { map } from 'itiriri/iterators/map';
import { toSet } from 'itiriri/reducers/toSet';

export function exclude<TElement, TKey>(
  source: AsyncIterable<TElement>,
  exclude: Iterable<TElement>,
  keySelector: (element: TElement) => TKey,
): AsyncIterable<TElement> {
  return asyncIterable(async function* () {
    const exclusionSet = toSet(map(exclude, keySelector));

    for await (const element of source) {
      const key = keySelector(element);

      if (!exclusionSet.has(key)) {
        yield await element;
      }
    }
  });
}
