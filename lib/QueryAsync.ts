import { concat } from './iterators/concat';
import { distinct } from './iterators/distinct';
import { exclude } from './iterators/exclude';
import { filter } from './iterators/filter';
import { flat } from './iterators/flat';
import { groupJoin } from './iterators/groupJoin';
import { intersect } from './iterators/intersect';
import { join } from './iterators/join';
import { leftJoin } from './iterators/leftJoin';
import { map } from './iterators/map';
import { skip } from './iterators/skip';
import { take } from './iterators/take';
import { nth } from './reducers/nth';
import { length } from './reducers/length';
import { first } from './reducers/first';
import { indexOf } from './reducers/indexOf';
import { last } from './reducers/last';
import { lastIndexOf } from './reducers/lastIndexOf';
import { max } from './reducers/max';
import { min } from './reducers/min';
import { reduce } from './reducers/reduce';
import { sum } from './reducers/sum';
import { AsyncIterableQuery } from './types/AsyncIterableQuery';
import { isAsyncIterable } from './utils/isAsyncIterable';
import { asyncIterable } from './utils/asyncIterable';
import { asyncIterator } from './utils/asyncIterator';
import { average } from './reducers/average';
import { forEach } from './reducers/forEach';
import { toIterable } from './reducers/toIterable';
import { slice } from './iterators/slice';

/**
 * Creates a queryable iterable.
 * @param source can be an array or any other async iterable.
 */
export function queryAsync<T>(source: AsyncIterable<T>): AsyncIterableQuery<T> {
  return new QueryAsync(source);
}

class QueryAsync<T> implements AsyncIterableQuery<T>{
  constructor(private readonly source: AsyncIterable<T>) {
  }

  [Symbol.asyncIterator](): AsyncIterator<T> {
    return asyncIterator(this.source);
  }

  // #region common methods
  entries(): AsyncIterableQuery<[number, T]> {
    return new QueryAsync(
      map(this.source, (elem, idx) => <[number, T]>[idx, elem]),
    );
  }

  keys(): AsyncIterableQuery<number> {
    return new QueryAsync(map(this.source, (elem, idx) => idx));
  }

  values(): AsyncIterableQuery<T> {
    return new QueryAsync(this.source);
  }

  forEach(action: (element: T, index: number) => void): Promise<void> {
    return forEach(this.source, action);
  }

  concat(other: Promise<T> | AsyncIterable<T>): AsyncIterableQuery<T> {
    return isAsyncIterable(other) ?
      new QueryAsync(concat(this.source, other)) :
      new QueryAsync(concat(this.source, (async function* (e) { yield e; })(other)));
  }

  prepend(other: T | AsyncIterable<T>): AsyncIterableQuery<T> {
    return isAsyncIterable(other) ?
      new QueryAsync(concat(other, this.source)) :
      new QueryAsync(concat(
        (async function* (e) { yield await Promise.resolve(e); })(other),
        this,
      ));
  }
  // #endregion

  // #region IterableValue implementation
  nth(index: number): Promise<T> {
    return nth(this.source, index);
  }

  indexOf(element: T, fromIndex: number = 0): Promise<number> {
    return indexOf(this.source, (elem, idx) => idx >= fromIndex && elem === element);
  }

  findIndex(predicate: (element: T, index: number) => boolean): Promise<number> {
    return indexOf(this.source, predicate);
  }

  lastIndexOf(element: T, fromIndex: number = 0): Promise<number> {
    return lastIndexOf(this.source, (elem, idx) => idx >= fromIndex && elem === element);
  }

  findLastIndex(predicate: (element: T, index: number) => boolean): Promise<number> {
    return lastIndexOf(this.source, predicate);
  }

  length(predicate: (element: T, index: number) => boolean = alwaysTrue()): Promise<number> {
    return length(filter(this.source, predicate));
  }

  first(): Promise<T> {
    return first(this.source);
  }

  find(predicate: (element: T, index: number) => boolean): Promise<T> {
    return first(filter(this.source, predicate));
  }

  last(): Promise<T> {
    return last(this.source);
  }

  findLast(predicate: (element: T, index: number) => boolean): Promise<T> {
    return last(filter(this.source, predicate));
  }

  average(selector: (element: T, index: number) => number = element<number>()): Promise<number> {
    return average(map(this.source, selector));
  }

  min(compareFn: (element1: T, element2: T) => number = comparer<T>()): Promise<T> {
    return min(this.source, compareFn);
  }

  max(compareFn: (element1: T, element2: T) => number = comparer<T>()): Promise<T> {
    return max(this.source, compareFn);
  }

  sum(selector: (element: T, index: number) => number = element<number>()): Promise<number> {
    return sum(map(this.source, selector));
  }

  toIterable(): Promise<Iterable<T>> {
    return toIterable(this.source);
  }

  reduce<TResult>(
    callback: (accumulator: TResult | T, current: T, index: number) => any,
    initialValue?: any,
  ): Promise<any> {
    return reduce(this.source, callback, initialValue);
  }

  // #region IterablePredicate implementation
  every(predicate: (element: T, index: number) => boolean): Promise<boolean> {
    return indexOf<T>(this.source, (e, i) => !predicate(e, i)).then(index => index === -1);
  }

  some(predicate: (element: T, index: number) => boolean): Promise<boolean> {
    return indexOf<T>(this, predicate).then(index => index !== -1);
  }

  includes(element: T, fromIndex: number = 0): Promise<boolean> {
    return this.some((elem, idx) => idx >= fromIndex && elem === element);
  }
  // #endregion

  // #region IterableFilter implementation
  filter(predicate: (element: T, index: number) => boolean): AsyncIterableQuery<T> {
    return new QueryAsync(filter(this.source, predicate));
  }

  take(count: number): AsyncIterableQuery<T> {
    return new QueryAsync(take(this.source, count));
  }

  skip(count: number): AsyncIterableQuery<T> {
    return new QueryAsync(skip(this.source, count));
  }

  slice(start?: number, end?: number): AsyncIterableQuery<T> {
    return new QueryAsync(slice(this, start, end));
  }
  // #endregion

  // #region IterableTransformation implementation
  map<S>(selector: (element: T, index: number) => S): AsyncIterableQuery<S> {
    return new QueryAsync(map(this.source, selector));
  }

  flat<S>(
    selector: (element: T, index: number) => AsyncIterable<S>,
  ): AsyncIterable<S> {
    return flat<S>(this.map(selector));
  }

  // #endregion

  // #region IterableSet implementation
  distinct<S>(selector: (element: T) => S = element<S>()): AsyncIterableQuery<T> {
    return new QueryAsync(distinct(this.source, selector));
  }

  exclude<S>(
    other: Iterable<T>,
    selector: (element: T) => S = element<S>(),
  ): AsyncIterableQuery<T> {
    return new QueryAsync(exclude(this.source, other, selector));
  }

  intersect<S>(
    other: Iterable<T>,
    selector: (element: T) => S = element<S>(),
  ): AsyncIterableQuery<T> {
    return new QueryAsync(intersect(this.source, other, selector));
  }

  union<S>(
    other: AsyncIterable<T>,
    selector: (element: T) => S = element<S>(),
  ): AsyncIterableQuery<T> {
    return new QueryAsync(distinct(concat(this.source, other), selector));
  }
  // #endregion

  // #region IterableJoin implementation
  join<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight) => TResult,
  ): AsyncIterableQuery<TResult> {
    const iterator = join(
      this.source,
      other,
      leftKeySelector,
      rightKeySelector,
      joinSelector);

    return new QueryAsync(iterator);
  }

  leftJoin<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right?: TRight) => TResult,
  ): AsyncIterableQuery<TResult> {
    const iterator = leftJoin(
      this.source,
      other,
      leftKeySelector,
      rightKeySelector,
      joinSelector);

    return new QueryAsync(iterator);
  }

  rightJoin<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    rightKeySelector: (element: TRight, index: number) => TKey,
    leftKeySelector: (element: T, index: number) => TKey,
    joinSelector: (right: TRight, left?: T) => TResult,
  ): AsyncIterableQuery<TResult> {
    throw Error('not implmeneted');
    // let iterator: AsyncIterable<TResult>;

    // this.toIterable().then((source) => {
    //   iterator = leftJoin(
    //     (async function* (e) { yield* e; })(other),
    //     source,
    //     rightKeySelector,
    //     leftKeySelector,
    //     joinSelector,
    //   );
    //   console.log('in');
    // });
    // console.log('out');

    // return new QueryAsync(iterator);
  }

  groupJoin<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight[]) => TResult,
  ): AsyncIterableQuery<TResult> {
    const iterator = groupJoin(
      this.source,
      other,
      leftKeySelector,
      rightKeySelector,
      joinSelector);

    return new QueryAsync(iterator);
  }
  // #endregion
}

function element<T>() {
  return (e: any, index?: number) => <T>e;
}

function alwaysTrue<T>() {
  return (e: any) => true;
}

function comparer<T>() {
  return (a: T, b: T) => a === b ? 0 : (a > b ? 1 : -1);
}
