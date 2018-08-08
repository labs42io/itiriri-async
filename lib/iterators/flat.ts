import { asyncIterable } from '../utils/asyncIterable';

export async function flat<T>(iterables: AsyncIterable<AsyncIterable<T>>): Promise<AsyncIterable<T>>;
export async function flat<T>(iterables: AsyncIterable<Iterable<T>>): Promise<AsyncIterable<T>>;
export async function flat<T>(iterables: Iterable<AsyncIterable<T>>): Promise<AsyncIterable<T>>;
export async function flat<T>(
  iterables: Iterable<AsyncIterable<T>> | AsyncIterable<AsyncIterable<T>> | AsyncIterable<Iterable<T>>,
): Promise<AsyncIterable<T>> {
  return asyncIterable(async function* () {
    for await (const element of iterables) {
      yield* element;
    }
  });
}

// @todo
// TBD: method signature, what option to support?
//  1. flattenAsync<T>(iterables: AsyncIterable<Iterable<T>>): Promise<AsyncIterable<T>>
//  2. flattenAsync<T>(iterables: Iterable<AsyncIterable<T>>): Promise<AsyncIterable<T>>
//  3. flattenAsync<T>(iterables: AsyncIterable<AsyncIterable<T>>): Promise<AsyncIterable<T>>
// Should we consider method overloading and support all 3 cases?
