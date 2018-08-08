import { AsyncIterableQuery } from './AsyncIterableQuery';

/**
 * Produce a new iterable that is a set iterable of unique elements.
 */
export interface AsyncIterableSet<T> extends AsyncIterable<T> {
  /**
   * Returns a sequence of unique elements.
   * @returns Iterable<T>
   */
  distinct(): AsyncIterableQuery<T>;

  /**
   * Returns a sequence of unique element transformations.
   * @param  {(element:T)=>S} selector element transformation
   * @returns AsyncIterable<T>
   */
  distinct<S>(selector: (element: T) => S): AsyncIterableQuery<T>;

  /**
   * Returns a sequence of unique elements not contained in a given sequence.
   * @param  {Iterable<T>} other element transformation
   * @returns AsyncIterable<T>
   */
  exclude(other: Iterable<T>): AsyncIterableQuery<T>;

  /**
   * Returns a sequence of unique elements not contained in a given sequence
   * using a transformation for value comparisons.
   * @param  {Iterable<T>} other items to compare and exclude
   * @param  {(element: T)=>S} selector element transformation
   * @returns Iterable<T>
   */
  exclude<S>(other: Iterable<T>, selector: (element: T) => S): AsyncIterableQuery<T>;

  /**
   * Returns a set intersection with a given sequence.
   * @param  {Iterable<T>} other
   * @returns AsyncIterable<T>
   */
  intersect(other: Iterable<T>): AsyncIterableQuery<T>;

  /**
   * Returns a set intersection with a given sequence using a transformation for comparisons.
   * @param  {Iterable<T>} other
   * @pa{(element: T)=>S} element transformation
   * @returns AsyncIterable<T>
   */
  intersect<S>(other: Iterable<T>, selector: (element: T) => S): AsyncIterableQuery<T>;

  /**
   * Returns a set union with a given sequence.
   * @param  {Iterable<T>} other
   * @returns AsyncIterable<T>
   */
  union(other: AsyncIterable<T>): AsyncIterableQuery<T>;

  /**
   * Returns a set union with a given sequence using a transformation for comparisons.
   * @param  {Iterable<T>} other
   * @pa{(element: T)=>S} element transformation
   * @returns AsyncIterable<T>
   */
  // union<S>(other: Iterable<T>, selector: (element: T) => S): AsyncIterableQuery<T>;

}
