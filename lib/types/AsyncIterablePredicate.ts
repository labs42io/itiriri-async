/**
 * Apply a predicate over an iterable.
 */
export interface AsyncIterablePredicate<T> extends AsyncIterable<T> {
  /**
   * Tests whether all the elements pass the predicate.
   * @param  {(element:T, index:number)=>boolean} predicate element predicate
   * @returns Promise<boolean>
   */
  every(predicate: (element: T, index: number) => boolean): Promise<boolean>;

  /**
   * Tests whether at least one element passes the predicate.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns Promise<boolean>
   */
  some(predicate: (element: T, index: number) => boolean): Promise<boolean>;

  /**
   * Determines whether the sequence includes a certain element.
   * @param element element to search
   * @returns Promise<boolean>
   */
  includes(element: T): Promise<boolean>;

  /**
 * Determines whether the sequence includes a certain element.
 * @param element element to search
 * @param fromIndex the start index
 * @returns Promise<boolean>
 */
  includes(element: T, fromIndex?: number): Promise<boolean>;
}
