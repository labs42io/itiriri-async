import { asyncIterable } from '../utils/asyncIterable';
import { filter } from './filter';

export function skip<TElement>(
  source: AsyncIterable<TElement>,
  count: number,
): AsyncIterable<TElement> {
  if (count < 0) {
    throw Error('Negative count is not supported, use await and sync iterator instead.');
  }

  return asyncIterable(async function* () {
    yield* filter(source, (element, index) => index >= count);
  });
}
