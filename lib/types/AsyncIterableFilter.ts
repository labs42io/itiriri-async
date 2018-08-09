import { AsyncIterableQuery } from './AsyncIterableQuery';

/**
 * Apply a filter over an iterable and return a new iterable.
 */
export interface AsyncIterableFilter<T> extends AsyncIterable<T> {
  /**
   * Returns a sequence of elements that pass the predicate.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns AsyncIterableQuery<T>
   */
  filter(predicate: (element: T, index: number) => boolean): AsyncIterableQuery<T>;

  /**
   * Returns a specified number of elements from the beginning of sequence.
   * If a negative count is specified, returns elements from the end of the sequence.
   * @param  {number} count
   * @returns AsyncIterable<T>
   */
  take(count: number): AsyncIterableQuery<T>;

  /**
   * Skips the specified number of elements from the beggining of sequence
   * and returns the remaining ones.
   * If a negative count is specified, skips elements from the end of the sequence.
   * @param  {number} count
   * @returns AsyncIterable<T>
   */
  skip(count: number): AsyncIterableQuery<T>;

  /**
   * Returns a sequence that represents the range of elements from start to end.
   * @returns AsyncIterable<T>
   */
  slice(): AsyncIterableQuery<T>;

  /**
 * Returns a sequence that represents the range of elements from start to end.
 * @param start zero-based index at which to start extraction
 * @returns AsyncIterable<T>
 */
  slice(start: number): AsyncIterableQuery<T>;

  /**
 * Returns a sequence that represents the range of elements from start to end.
 * @param start zero-based index at which to start extraction
 * @param end zero-based index before which to end extraction (not including)
 * @returns AsyncIterable<T>
 */
  slice(start: number, end: number): AsyncIterableQuery<T>;
}
