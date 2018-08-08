/**
 * Calculate a scalar value over an iterable.
 */
export interface AsyncIterableValue<T> extends AsyncIterable<T> {
  /**
   * Returns the element at a specified index.
   * For a negative index returns the element from the end of the sequence.
   * If index is out of the range, returns undefined.
   * @param  {number} index element's index
   * @returns Promise<T>
   */
  nth(index: number): Promise<T>;

  /**
   * Returns the first index at which a given element can be found.
   * If not present, returns -1.
   * @param  {T} element element to search
   * @returns Promise<number>
   */
  indexOf(element: T): Promise<number>;

  /**
 * Returns the first index at which a given element can be found.
 * If not present, returns -1.
 * @param  {T} element element to search
 * @param fromIndex the start index
 * @returns Promise<number>
 */
  indexOf(element: T, fromIndex: number): Promise<number>;

  /**
   * Finds the first index at which a given element satisfies the specified predicate.
   * If not present, returns -1.
   * @param  {(element:T)=>boolean} predicate element predicate
   * @returns Promise<number>
   */
  findIndex(predicate: (element: T, index: number) => boolean): Promise<number>;

  /**
 * Returns the last index at which a given element can be found.
 * If not present, returns -1.
 * @param  {T} element element to search
 * @returns Promise<number>
 */
  lastIndexOf(element: T): Promise<number>;

  /**
   * Returns the last index at which a given element can be found.
   * If not present, returns -1.
   * @param  {T} element element to search
   * @param fromIndex the start index
   * @returns Promise<number>
   */
  lastIndexOf(element: T, fromIndex: number): Promise<number>;

  /**
   * Finds the last index at which a given element satisfies the specified predicate.
   * If not present, returns -1.
   * @param  {T} element element to search
   * @returns Promise<number>
   */
  findLastIndex(predicate: (element: T, index: number) => boolean): Promise<number>;

  /**
   * Returns the number of elements.
   * @returns Promise<number>
   */
  length(): Promise<number>;

  /**
   * Returns the number of elements matching the specified predicate.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns Promise<number>
   */
  length(predicate: (element: T, index: number) => boolean): Promise<number>;

  /**
   * Returns the first element.
   * For an empty sequence returns undefined.
   * @returns Promise<T>
   */
  first(): Promise<T>;

  /**
   * Finds the first element that satisfies the specified predicate.
   * If no element satisfies the predicate, returns undefined.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns Promise<T>
   */
  find(predicate: (element: T, index: number) => boolean): Promise<T>;

  /**
   * Returns the last element.
   * For an empty sequence returns undefined.
   * @returns Promise<T>
   */
  last(): Promise<T>;

  /**
   * Finds the last element that satisfies the specified predicate.
   * If no element satisfies the predicate, returns undefined.
   * @param  {(element:T,index:number)=>boolean} predicate element predicate
   * @returns Promise<T>
   */
  findLast(predicate: (element: T, index: number) => boolean): Promise<T>;

  /**
   * Returns the average value.
   * If sequence is empty, returns undefined.
   * @returns Promise<number>
   */
  average(): Promise<number>;

  /**
   * Returns the average value over a sequence of transformed values.
   * If sequence is empty, returns undefined.
   * @param  {(element:T,index:number)=>number} selector element transformation
   * @returns Promise<number>
   */
  average(selector: (element: T, index: number) => number): Promise<number>;

  /**
   * Returns the minimum value.
   * If sequence is empty, returns undefined.
   * @returns Promise<T>
   */
  min(): Promise<T>;

  /**
   * Returns the minimum value from a sequence using a comparer function.
   * If sequence is empty, returns undefined.
   * @param  {(element1:T,element2:T)=>number} compareFn comparer function that returns -1
   * for element1<element2, 1 for element1>element2, 0 for equal values
   * @returns Promise<T>
   */
  min(compareFn: (element1: T, element2: T) => number): Promise<T>;

  /**
   * Returns the maximum value.
   * If sequence is empty, returns undefined.
   * @returns Promise<T>
   */
  max(): Promise<T>;

  /**
   * Returns the maximum value from a sequence using a compare function.
   * If sequence is empty, returns undefined.
   * @param  {(element1:T,element2:T)=>number} compareFn comparer function that returns -1
   * for element1<element2, 1 for element1>element2, 0 for equal values
   * @returns Promise<T>
   */
  max(compareFn: (element1: T, element2: T) => number): Promise<T>;

  /**
   * Returns the sum of all elements.
   * If sequence is empty, returns undefined.
   * @returns Promise<number>
   */
  sum(): Promise<number>;

  /**
   * Returns the sum of elements from a sequence of transformed values.
   * If sequence is empty, returns undefined.
   * @param  {(element:T,index:number)=>number} selector element transformation
   * @returns Promise<number>
   */
  sum(selector: (element: T, index: number) => number): Promise<number>;

  /**
   * Applies a function against an accumulator and each element to reduce it to a single value
   * (from left to right).
   * @param  {(accumulator:TResult,current:T,index:number)=>TResult} callback accumulator function
   * @returns Promise<TResult>
   */
  reduce(
    callback: (accumulator: T, current: T, index: number) => T,
  ): Promise<T>;

  /**
   * Applies a function against an accumulator and each element to reduce it to a single value
   * (from left to right).
   * @param  {(accumulator:S,current:T,index:number)=>S} callback accumulator function
   * @param  {S} initialValue initial value
   * @returns Promise<S>
   */
  reduce<S>(
    callback: (accumulator: S, current: T, index: number) => S,
    initialValue: S,
  ): Promise<S>;

  /**
   * Runs through every element and applies a given function.
   * @param  {(element:T,index:number)=>void} action function to apply on each element
   * @returns Promise<void>
   */
  forEach(action: (element: T, index: number) => void): Promise<void>;
}
