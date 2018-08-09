import { AsyncIterableQuery } from './AsyncIterableQuery';

/**
 * Transform an iterable to a new iterable.
 */
export interface AsyncIterableTransformation<T> extends AsyncIterable<T> {
  /**
   * Returns a sequence of transformed values.
   * @param  {(element:T,index:number)=>S} selector element transformation
   * @returns AsyncIterable<T>
   */
  map<S>(selector: (element: T, index: number) => S): AsyncIterableQuery<S>;

  /**
   * Returns a sequence with all sub-sequences concatenated.
   * @param  {(element:T,index:number)=>Iterable<S>} selector sub-sequence
   * @returns AsyncIterableQuery<T>
   */
  flat<S>(selector: (element: T, index: number) => AsyncIterable<S>): AsyncIterable<S>;

  /**
 * Returns a sequence with all sub-sequences concatenated.
 * @returns AsyncIterableQuery<T>
 */
  flat<S>(): AsyncIterableQuery<S>;
}
