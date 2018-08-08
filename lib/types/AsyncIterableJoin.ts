import { AsyncIterableQuery } from './AsyncIterableQuery';

/**
 * Join two iterables to produce a new iterable.
 */
export interface AsyncIterableJoin<T> extends AsyncIterable<T> {
  /**
   * Returns a sequence of correlated elements tranformation that match a given key.
   * @param  {Iterable<TRight>} other
   * @param  {(element:T,index:number)=>TKey} leftKeySelector left element key selector
   * @param  {(element:TRight,index:number)=>TKey} rightKeySelector right element key selector
   * @param  {(left:T,right:TRight)=>TResult} joinSelector transformation
   * @returns AsyncIterable<TResult>
   */
  join<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight) => TResult,
  ): AsyncIterableQuery<TResult>;

  /**
   * Returns a sequence of correlated elements tranformation that match a given key.
   * The transformation is called on an undefined right value if there is no match.
   * @param  {Iterable<TRight>} other
   * @param  {(element:T,index:number)=>TKey} leftKeySelector left element key selector
   * @param  {(element:TRight,index:number)=>TKey} rightKeySelector right element key selector
   * @param  {(left:T,right?:TRight)=>TResult} joinSelector transformation
   * @returns AsyncIterable<TResult>
   */
  leftJoin<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right?: TRight) => TResult,
  ): AsyncIterableQuery<TResult>;

  /**
   * Returns a sequence of correlated elements tranformation that match a given key.
   * The transformation is called on an undefined left value if there is no match.
   * @param other
   * @param rightKeySelector right element key selector
   * @param leftKeySelector left element key selector
   * @param  {(right:TRight,left?:T)=>TResult} joinSelector transformation
   * @returns AsyncIterable<TResult>
   */
  rightJoin<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    rightKeySelector: (element: TRight, index: number) => TKey,
    leftKeySelector: (element: T, index: number) => TKey,
    joinSelector: (right: TRight, left?: T) => TResult,
  ): AsyncIterableQuery<TResult>;

  /**
   * Returns a sequence of correlated elements where each element from the current sequence
   * is matched with zero or more elements from the other sequence.
   * @param  {Iterable<TRight>} other
   * @param  {(element:T,index:number)=>TKey} leftKeySelector left element key selector
   * @param  {(element:TRight,index:number)=>TKey} rightKeySelector right element key selector
   * @param  {(left:T,right:TRight)=>TResult} joinSelector transformation
   * @returns AsyncIterable<TResult>
   * @todo review name
   */
  groupJoin<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight[]) => TResult,
  ): AsyncIterableQuery<TResult>;
}
