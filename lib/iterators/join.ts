import { asyncIterable } from '../utils/asyncIterable';
import { toGroups } from 'itiriri/reducers/toGroups';

export function join<TLeft, TRight, TKey, TResult>(
  source: AsyncIterable<TLeft>,
  others: Iterable<TRight>,
  leftKeySelector: (element: TLeft, index: number) => TKey,
  rightKeySelector: (element: TRight, index: number) => TKey,
  joinSelector: (left: TLeft, right: TRight) => TResult,
): AsyncIterable<TResult> {
  return asyncIterable(async function* () {
    let index = 0;
    const rightMap = toGroups(others, rightKeySelector, x => x);

    for await (const element of source) {
      const leftKey = leftKeySelector(element, index++);
      const rightValues = rightMap.get(leftKey);

      if (rightValues) {
        for (const rightMatch of rightValues) {
          yield await joinSelector(element, rightMatch);
        }
      }

    }
  });
}
