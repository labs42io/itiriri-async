import { asyncIterable } from '../utils/asyncIterable';

export function concat<TElement>(
  left: AsyncIterable<TElement>,
  rigth: AsyncIterable<TElement>,
): AsyncIterable<TElement> {
  return asyncIterable(async function* () {
    yield* await left;
    yield* await rigth;
  });
}
