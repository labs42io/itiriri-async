import { asyncIterable } from '../utils/asyncIterable';

export function map<TElement, TResult>(
  source: AsyncIterable<TElement>,
  transform: (element: TElement, index: number) => TResult,
): AsyncIterable<TResult> {
  return asyncIterable(async function* () {
    let index = 0;

    for await (const element of source) {
      yield await Promise.resolve(transform(element, index++));
    }
  });
}
