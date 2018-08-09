import { asyncIterable } from '../utils/asyncIterable';

export function flat<T>(iterables: AsyncIterable<AsyncIterable<T>>): AsyncIterable<T>;
export function flat<T>(iterables: AsyncIterable<Iterable<T>>): AsyncIterable<T>;
export function flat<T>(iterables: Iterable<AsyncIterable<T>>): AsyncIterable<T>;
export function flat<T>(
  iterables: Iterable<AsyncIterable<T>> |
    AsyncIterable<AsyncIterable<T>> |
    AsyncIterable<Iterable<T>>,
): AsyncIterable<T> {
  return asyncIterable(async function* () {
    for await (const element of iterables) {
      yield* element;
    }
  });
}
