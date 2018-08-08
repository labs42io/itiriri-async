import { AsyncIterableJoin } from './AsyncIterableJoin';
import { AsyncIterablePredicate } from './AsyncIterablePredicate';
import { AsyncIterableFilter } from './AsyncIterableFilter';
import { AsyncIterableSet } from './AsyncIterableSet';
import { AsyncIterableTransformation } from './AsyncIterableTransformation';
import { AsyncIterableValue } from './AsyncIterableValue';

export interface AsyncIterableQuery<T> extends
  AsyncIterableValue<T>,
  AsyncIterablePredicate<T>,
  AsyncIterableFilter<T>,
  AsyncIterableTransformation<T>,
  AsyncIterableSet<T>,
  AsyncIterableJoin<T>,
  AsyncIterable<T> {

  /**
   * Returns a sequence of key/value pair for each element and its index.
   * @returns AsyncIterable<[number,T]>
   */
  entries(): AsyncIterableQuery<[number, T]>;

  /**
   * Returns a sequence of keys for each index in the source sequence.
   * @returns AsyncIterable<number>
   */
  keys(): AsyncIterableQuery<number>;

  /**
   * Returns a sequence of values for each index in the source sequence.
   * @returns AsyncIterable<T>
   */
  values(): AsyncIterableQuery<T>;

  /**
   * Concatenates the sequence with another one.
   * @param  {Iterable<T> | Promise<T>} other
   * @returns AsyncIterable<T>
   */
  concat(other: Promise<T> | AsyncIterable<T>): AsyncIterableQuery<T>;

  /**
   * Returns a sequence with given elements at the beggining.
   * @param  {Iterable<T> | T} other
   * @returns AsyncIterable<T>
   * @todo review name
   */
  prepend(other: AsyncIterable<T> | T): AsyncIterableQuery<T>;
}
