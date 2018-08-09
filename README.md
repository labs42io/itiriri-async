# itiriri-async

[![Build Status](https://travis-ci.org/labs42io/itiriri-async.svg?branch=dev)](https://travis-ci.org/labs42io/itiriri-async)
[![Coverage Status](https://coveralls.io/repos/github/labs42io/itiriri-async/badge.svg?branch=dev)](https://coveralls.io/github/labs42io/itiriri-async?branch=dev)

A library for asynchronous iteration.

```ts
async function* generator() {
  let id = 1;
  while (true) {
    yield WebRequest.json<any>('https://jsonplaceholder.typicode.com/todos/' + id++);
  }
}

async function first2Uncompleted() {
  const q = await queryAsync(generator())
    .filter(x => x.completed === false)
    .map(x => x.title)
    .take(2)
    .awaitAll();
  console.log(q.toArray());
}

first2Uncompleted();
// [ 'delectus aut autem', 'quis ut nam facilis et officia qui' ]
```

> Check examples folder for more

---

## Complete list of methods

* [average](#average)
* [concat](#concat)
* [distinct](#distinct)
* [entries](#entries)
* [every](#every)
* [exclude](#exclude)
* [filter](#filter)
* [find](#find)
* [findIndex](#findindex)
* [findLast](#findlast)
* [findLastIndex](#findlastindex)
* [first](#first)
* [flat](#flat)
* [forEach](#foreach)
* [groupJoin](#groupjoin)
* [includes](#includes)
* [indexOf](#indexof)
* [intersect](#intersect)
* [join](#join)
* [keys](#keys)
* [last](#last)
* [lastIndexOf](#lastindexof)
* [leftJoin](#leftjoin)
* [length](#length)
* [map](#map)
* [max](#max)
* [min](#min)
* [nth](#nth)
* [prepend](#prepend)
* [reduce](#reduce)
* [skip](#skip)
* [slice](#slice)
* [some](#some)
* [sum](#sum)
* [take](#take)
* [union](#union)
* [values](#values)

### `average`

Returns the average value.

> Syntax

```ts
average(): Promise<number>;
average(selector: (element: T, index: number) => number): Promise<number>;
```

> Parameters
* `selector` - *(optional)* a value transformer function to apply to each element

For a sequence with no elements returns `undefined`.

> Example

```ts
import { queryAsync } from 'itiriri-async';

async function* generator1() {
  yield* [41, 42, 43];
}

async function* generator2() {
  yield* [{value: 1}, {value: 2}];
}

queryAsync(generator1()).average()  // returns Promise<42>
queryAsync(generator2()).average(elem => elem.value) // returns Promise<1.5>
```

### `concat`

Concatenates the sequence with another one.

> Syntax

```ts
concat(other: T): AsyncIterableQuery<T>;
concat(other: Promise<T>): AsyncIterableQuery<T>;
concat(other: Iterable<T>): AsyncIterableQuery<T>;
concat(other: AsyncIterable<T>): AsyncIterableQuery<T>;
```

> Parameters
* `other` - *(required)* sequence to concatenate

> Example

```ts
import { queryAsync } from 'itiriri-async';

async function* generator1() {
  yield* [1, 2, 3];
}

async function* generator2() {
  yield* [4, 5];
}

(async function() {
  const q = await queryAsync(generator1()).concat(generator2()).awaitAll();
  q.toArray();   // returns [1, 2, 3, 4, 5]
})()

(async function() {
  const q = await queryAsync(generator1()).concat([2, 1]).awaitAll();
  q.toArray();   // returns [1, 2, 3, 2, 1]
})()

(async function() {
  const q = await queryAsync(generator1()).concat(-1).awaitAll();
  q.toArray();   // returns [1, 2, 3, -1]
})()
```

`concat` *is a deferred method and is executed only when the result sequence is iterated.*

### `distinct`

Returns a sequence of unique elements.

> Syntax

```ts
distinct(): AsyncIterableQuery<T>;
distinct<S>(selector: (element: T) => S): AsyncIterableQuery<T>;
```

> Parameters
* `selector` - *(optional)* a value transformer function to be used for comparisons

> Example

```ts
import { queryAsync } from 'itiriri-async';

async function* generator() {
  yield* [1, 2, 3, 3, 3, 4, 2];
}

(async function () {
  const q = await queryAsync(generator()).distinct().awaitAll();
  q.toArray();   // returns [1, 2, 3, 4]
})();
```

`distinct` *is a deferred method and is executed only when the result sequence is iterated.*

### `entries`

Returns a sequence of key/value pair for each element and its index.

> Syntax

```ts
entries(): AsyncIterableQuery<[number, T]>;
```

> Example

```ts
import { queryAsync } from 'itiriri-async';

async function* generator() {
  yield* ['Bob', 'Alice'];
}

(async function () {
  const q = await queryAsync(generator()).entries().awaitAll();
  q.toArray();   // returns [[0, 'Bob'], [1, 'Alice']]
})();
```

`entries` *is a deferred method and is executed only when the result sequence is iterated.*

### `every`

Tests whether all the elements pass the predicate.

> Syntax

```ts
every(predicate: (element: T, index: number) => boolean): Promise<boolean>;
```

> Parameters
* `predicate` - *(required)* function to test for each element

> Example

```ts
import { queryAsync } from 'itiriri-async';
async function* generator() {
  yield* [1, 4, 3, 0];
}

(async function () {
  await queryAsync(generator()).every(x => x >= 0); // true
})();

(async function () {
  await queryAsync(generator()).every(x => x > 0); // false
})();
```

### `exclude`

Returns a sequence of elements not contained in a given sequence.

> Syntax

```ts
exclude<S>(others: Iterable<T>): AsyncIterableQuery<T>;
exclude<S>(others: Iterable<T>, selector: (element: T) => S): AsyncIterableQuery<T>;
```

> Parameters
* `others` - *(required)* a sequence of elements to be excluded
* `selector` - *(optional)* a value transformer function to be used for comparisons

> Example

```ts
import { queryAsync } from 'itiriri-async';

async function* generator1() {
  yield* [2, 0, 1, 8, 2];
}

async function* generator2() {
  yield* [{ id: 1 }, { id: 2 }];
}

(async function () {
  const q = await queryAsync(generator1()).exclude([0, 1]).awaitAll();
  q.toArray(); // returns [2, 8, 2]
})();

(async function () {
  const q = await queryAsync(generator2()).exclude([{ id: 2 }], x => x.id).awaitAll();
  q.toArray(); // returns [{id: 1}]
})();
```

`exclude` *is a deferred method and is executed only when the result sequence is iterated.*

### `filter`

Returns a sequence of elements that pass the predicate.

> Syntax

```ts
filter(predicate: (element: T, index: number) => boolean): AsyncIterableQuery<T>;
```

> Parameters
* `predicate` - *(required)* function to test for each element

> Example

```ts
import { queryAsync } from 'itiriri-async';

async function* generator() {
  yield* [1, 2, 3, 4, 5];
}

(async function () {
  const q = await queryAsync(generator()).filter(elem => elem < 3).awaitAll();
  q.toArray(); // returns [1, 2]
})();

(async function () {
  const q = await queryAsync(generator()).filter(elem => elem > 10).awaitAll();
  q.toArray(); // returns []
})();
```

`filter` *is a deferred method and is executed only when the result sequence is iterated.*

### `find`

Finds the first element that satisfies the specified predicate.

> Syntax

```ts
find(predicate: (element: T, index: number) => boolean): Promise<T>;
```

> Parameters
* `predicate` - *(required)* function to test for each element

If no element satisfies the predicate, returns `undefined`.

> Example

```ts
import { queryAsync } from 'itiriri-async';

async function* generator() {
  yield* [1, 2, 3, 4, 5];
}

(async function () {
  await queryAsync(generator()).find(elem => elem > 2); // returns 3
})();

(async function () {
  await queryAsync(generator()).find(elem => elem > 10); // returns undefined
})();
```

### `findIndex`

Finds the first index at which a given element satisfies the specified predicate.

> Syntax

```ts
findIndex(predicate: (element: T, index: number) => boolean): Promise<number>;
```

> Parameters
* `predicate` - *(required)* function to test for each element

If no element satisfies the predicate, returns `-1`.

> Example

```ts
import { queryAsync } from 'itiriri-async';

async function* generator() {
  yield* [1, 2, 3, 4, 5];
}

(async function () {
  await queryAsync(generator()).find(elem => elem > 2); // returns 2
})();

(async function () {
  await queryAsync(generator()).find(elem => elem > 10); // returns -1
})();
```

### `findLast`

Finds the last element that satisfies the specified predicate.

> Syntax

```ts
findLast(predicate: (element: T, index: number) => boolean): Promise<T>;
```

> Parameters
* `predicate` - *(required)* function to test for each element

If no element satisfies the predicate, returns `undefined`.

> Example

```ts
import { queryAsync } from 'itiriri-async';

async function* generator() {
  yield* [1, 2, 3, 4, 5];
}

(async function () {
  await queryAsync(generator()).findLast(elem => elem > 2); // returns 5
})();

(async function () {
  await queryAsync(generator()).findLast(elem => elem > 10); // returns undefined
})();
```

### `findLastIndex`

Finds the last index at which a given element satisfies the specified predicate.

> Syntax

```ts
findLastIndex(predicate: (element: T, index: number) => boolean): Promise<number>;
```

> Parameters
* `predicate` - *(required)* function to test for each element

If not present, returns -1.

> Example

```ts
import { queryAsync } from 'itiriri-async';

async function* generator() {
  yield* [1, 2, 3, 4, 5];
}

(async function () {
  await queryAsync(generator()).findLastIndex(elem => elem > 2); // returns 4
})();

(async function () {
  await queryAsync(generator()).findLastIndex(elem => elem > 10); // returns -1
})();
```

### `first`

Returns the first element in a sequence.

> Syntax

```ts
first(): Promise<T>;
```

For an empty sequence returns `undefined`.

> Example

```ts
import { queryAsync } from 'itiriri-async';

async function* generator1() {
  yield* [1, 2, 3, 4, 5];
}

async function* generator2() {
  yield* [];
}

(async function () {
  await queryAsync(generator1()).first(); // returns 1
})();

(async function () {
  await queryAsync(generator2()).first(); // returns undefined
})();
```

### `flat`

Returns a sequence with all sub-sequences concatenated.

> Syntax

```ts
flat<T>(selector?: (element: T, index: number) => AsyncIterable<S>): AsyncIterableQuery<T>;
```

> Parameters
* `selector` - *(optional)* a value transformer function to be used for comparisons

> Example

```ts
import { queryAsync } from 'itiriri-async';

async function* generator() {
  yield* [[1, 2, 3], [4, 5]];
}

(async function () {
  const q = await queryAsync(generator()).flat().awaitAll();
  q.toArray(); // returns [1, 2, 3, 4, 5]
})();
```

`flat` *is a deferred method and is executed only when the result sequence is iterated.*

### `forEach`

Runs through every element and applies a given function.

> Syntax

```ts
forEach(action: (element: T, index: number) => void): Promise<void>;
```

> Parameters
* `action` - *(required)* function to apply on each element

> Example

```ts
import { queryAsync } from 'itiriri-async';

async function* generator() {
  yield* [1, 2, 3];
}

(async function () {
  queryAsync(generator()).forEach(elem => console.log(elem));
})();
// 1
// 2
// 3
```

### `groupJoin`

Returns a sequence of correlated elements where each element from the current sequence
is matched with zero or more elements from the other sequence.

> Syntax

```ts
groupJoin<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight[]) => TResult,
  ): AsyncIterableQuery<TResult>;
```

> Parameters
* `other` - *(required)* sequence to join
* `leftKeySelector` - *(required)* function that provides the key of each element from source sequence
* `rightKeySelector` - *(required)* function that provides the key of each element from joined sequence
* `joinSelector` - *(required)* a transformation function to apply on each joined element with group

The `joinSelector` function is called on each element from the source sequence and the array of matched
elements from the joined sequence.  
When an element from the source sequence doesn't match with any of the elements from the joined sequence,
the `joinSelector` function will be called with an empty array.

> Example

```ts
import { queryAsync } from 'itiriri-async';

async function* generator() {
  yield* [1, 2, 3];
}

(async function () {
  const q = await queryAsync(generator()).groupJoin([1, 2, 3, 1, 1, 2], x => x, x => x, (x, y) => ({ x, y })).awaitAll();
  q.toArray();
})();
//[ { x: 1, y: [ 1, 1, 1 ] },
//  { x: 2, y: [ 2, 2 ] },
//  { x: 3, y: [ 3 ] } ]
```

`groupJoin` *is a deferred method and is executed only when the result sequence is iterated.*

### `includes`

Determines whether the sequence includes a certain element.

> Syntax

```ts
includes(element: T): Promise<boolean>;
includes(element: T, fromIndex: number): Promise<boolean>;
```

> Parameters
* `element` - *(required)* the element to search for
* `fromIndex` - *(optional)* starting index, defaults to `0`

`includes` uses triple equals `===` to compare elements.

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync([1, 2, 3]).includes(2); // returns true
queryAsync([1, 2, 3]).includes(0); // returns false
```

### `indexOf`

Returns the first (zero-based) index at which a given element can be found.

> Syntax

```ts
indexOf(element: T): Promise<number>;
indexOf(element: T, fromIndex: number): Promise<number>;
```

> Parameters
* `element` - *(required)* the element to search for
* `fromIndex` - *(optional)* starting index, defaults to `0`

When an element is not found, returns -1.  
`indexOf` uses triple equals `===` to compare elements.

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync(['a', 'b', 'c']).indexOf('c'); // returns 2
queryAsync(['a', 'b', 'c']).indexOf('x'); // returns -1
```

### `intersect`

Returns a set intersection with a given sequence.

> Syntax

```ts
intersect(others: Iterable<T>): AsyncIterableQuery<T>;
intersect<S>(other: Iterable<T>, selector: (element: T) => S): AsyncIterableQuery<T>;
```

> Parameters
* `other` - *(required)* the sequence to intersect with
* `selector` - *(optional)* a value transformer function to be used for comparisons

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync([1, 2, 3]]).intersect([2, 3, 4]).toArray(); // returns [2, 3]
queryAsync([{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'})
  .intersect([{id: 3, name: 'David'}, {id: 1, name: 'Alice'}], elem => elem.id)
  .toArray(); // returns [{id: 1, name: 'Alice'}]
```

`intersect` *is a deferred method and is executed only when the result sequence is iterated.*

### `join`

Returns a sequence of correlated elements transformation that match a given key.

> Syntax

```ts
join<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right: TRight) => TResult,
  ): AsyncIterableQuery<TResult>;
```

> Parameters
* `other` - *(required)* sequence to join
* `leftKeySelector` - *(required)* function that provides the key of each element from source sequence
* `rightKeySelector` - *(required)* function that provides the key of each element from joined sequence
* `joinSelector` - *(required)* a transformation function to apply on each matched tuple

The `join` method works as an sql inner join.

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync([1, 2, 3])
  .join([2, 3, 4], n => n, n => n, (a, b) => `${a}-${b}`)
  .toArray();
// returns ['2-2', '3-3']

queryAsync([{countryId: 1, code: '+1'}, {countryId: 2, code: '+44'}]])
  .join(
    [{ id: 1, country: 'US' }, {id: 3, country: 'MD'}],
    left => left.countryId,
    right => right.id,
    (left, right) => ({country: right.country, code: left.code}))
  .toArray();
// returns [{country: 'US', code: '+1'}]
```

`join` *is a deferred method and is executed only when the result sequence is iterated.*

### `keys`

Returns a sequence of keys for each index in the source sequence.

> Syntax

```ts
keys(): AsyncIterableQuery<number>;
```

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync(['a', 'b', 'c']).keys().toArray(); // returns [0, 1, 2]
```

`keys` *is a deferred method and is executed only when the result sequence is iterated.*

### `last`

Returns the last element in a sequence.

> Syntax

```ts
last(): Promise<T>;
```

For an empty sequence returns `undefined`.

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync(['a', 'b', 'c']).last(); // returns 'c'
queryAsync([]).last(); // returns undefined
```

### `lastIndexOf`

Returns the last index at which a given element can be found.

> Syntax

```ts
lastIndexOf(element: T): Promise<number>;
lastIndexOf(element: T, fromIndex: number): Promise<number>;
```

> Parameters
* `element` - *(required)* the element to search for
* `fromIndex` - *(optional)* starting index, defaults to `0`

When an element is not found, returns -1.  
`lastIndexOf` uses triple equals `===` to compare elements.

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync(['a', 'c', 'c']).lastIndexOf('c'); // returns 2
queryAsync(['a', 'b', 'c']).lastIndexOf('x'); // returns -1
```

### `leftJoin`

Returns a sequence of correlated elements transformation that match a given key.

> Syntax

```ts
leftJoin<TKey, TRight, TResult>(
    other: Iterable<TRight>,
    leftKeySelector: (element: T, index: number) => TKey,
    rightKeySelector: (element: TRight, index: number) => TKey,
    joinSelector: (left: T, right?: TRight) => TResult,
  ): AsyncIterableQuery<TResult>;
```

> Parameters
* `other` - *(required)* sequence to join
* `leftKeySelector` - *(required)* function that provides the key of each element from source sequence
* `rightKeySelector` - *(required)* function that provides the key of each element from joined sequence
* `joinSelector` - *(required)* a transformation function to apply on each matched tuple

The `leftJoin` method works as an sql left join.
When an element from the left sequence doesn't match with any of the elements from the right sequence,
the `joinSelector` function is called with an `undefined` right value.  

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync([1, 2, 3])
  .leftJoin([2, 3, 4, 2], n => n, n => n, (a, b) => `${a}-${b || '#'}`)
  .toArray();
// returns ['1-#', '2-2', '2-2', '3-3']

queryAsync([{book: 'History', owner: 3}, {book: 'Math', owner: 2}, {book: 'Art'}]])
  .leftJoin(
    [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}, {id: 3, name: 'Eve'}],
    left => left.owner,
    right => right.id,
    (left, right) => ({book: left.book, owner: right && right.owner || '--'}))
  .toArray();
// returns [
//   {book: 'History', owner: 'Eve'},
//   {book: 'Math', owner: 'Bob'},
//   {book: 'Art', owner: '--'}]
```

`leftJoin` *is a deferred method and is executed only when the result sequence is iterated.*

### `length`

Returns the number of elements in a sequence.

> Syntax

```ts
length(): Promise<number>;
length(predicate: (element: T, index: number) => boolean): <number>;
```

> Parameters
* `predicate` - *(optional)* a function to count only the elements that match the predicate

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync([1, 2, 3, 4, 5]).length();  // returns 5
queryAsync([1, 2, 3, 4, 5]).length(elem => elem > 2);  // returns 3
```

### `map`

Returns a sequence of transformed values.

> Syntax

```ts
map<S>(selector: (element: T, index: number) => S): AsyncIterableQuery<S>;
```

> Parameters
* `selector` - *(required)* a value transformer function to apply to each element

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync([1, 2, 3]).map(elem => elem * 10).toArray(); // returns [10, 20, 30]
```

`map` *is a deferred method and is executed only when the result sequence is iterated.*

### `max`

Returns the maximum element in a sequence.

> Syntax

```ts
max(): Promise<T>;
max(compareFn: (a: T, b: T) => number): Promise<T>;
```

> Parameters
* `compareFn` - *(optional)* a comparer function that compares two elements from a sequence and returns:
  * `-1` when `a` is less than `b`
  * `1` when `a` is greater `b`
  * `0` when `a` equals to `b`

If sequence is empty, returns `undefined`.  

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync([1, 2, 3]).max(); // returns 3
queryAsync([]).max(); // returns undefined
queryAsync([7, 3, 11, 5]).max((a, b) => (1 / a) - (1 / b)); // returns 3
```

### `min`

Returns the minimum element in a sequence.

> Syntax

```ts
min(): Promise<T>;
min(compareFn: (a: T, b: T) => number): Promise<T>;
```

> Parameters
* `compareFn` - *(optional)* a comparer function that compares two elements from a sequence and returns:
  * `-1` when `a` is less than `b`
  * `1` when `a` is greater `b`
  * `0` when `a` equals to `b`

If sequence is empty, returns `undefined`.  

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync([1, 2, 3]).min(); // returns 1
queryAsync([]).min(); // returns undefined
queryAsync([7, 3, 11, 5]).min((a, b) => (1 / a) - (1 / b)); // returns 11
```

### `nth`

Returns the element at a specified index.

> Syntax

```ts
nth(index: number): Promise<T>;
```

> Parameters
* `index` - *(required)* zero based index at which to get the element

For a negative index returns the element from the end of the sequence.  
If index is out of the range, returns `undefined` .

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync(['a', 'b', 'c', 'd']).nth(2)  // returns 'c'
queryAsync(['a', 'b', 'c', 'd']).nth(-1) // returns 'd'
queryAsync(['a', 'b', 'c', 'd']).nth(10) // returns undefined
```

### `prepend`

 Returns a sequence with given elements at the beginning.

> Syntax

```ts
prepend(other: AsyncIterable<T> | T): AsyncIterableQuery<T>;
```

> Parameters
* `other` - *(required)* the sequence to be added at the beginning

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync([1, 2, 3]).prepend([9, 10]).toArray(); // returns [1, 2, 3, 9, 10]
```

`prepend` *is a deferred method and is executed only when the result sequence is iterated.*

### `reduce`

Applies a function against an accumulator and each element *(from left to right)* to reduce it to a single value.

> Syntax

```ts
reduce(
    callback: (accumulator: T, current: T, index: number) => T,
  ): Promise<any>;

reduce<S>(
    callback: (accumulator: S, current: T, index: number) => S,
    initialValue: S,
  ): Promise<any>;
```

> Parameters
* `callback` - *(required)* function to execute on each element in the sequence, taking three arguments
  * `accumulator` the accumulator accumulates the callback's return values;
  * `current` the current element being processed;
  * `currentIndex` the index of the current element being processed;
* `initialValue` - *(optional)* value to use as the first argument to the first call of the `callback`

Calling `reduce` on an empty sequence without an initial value throws an error.

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync([ 1, 2, 42, 0 ]).reduce((acc, elem) => Math.max(acc, elem)); // returns 42
queryAsync([ 1, 2, 3 ]).reduce((acc, elem) => acc + elem, 10); // returns 16
```

### `skip`

Skips the specified number of elements from the beginning of sequence and returns the remaining ones.

> Syntax

```ts
skip(count: number): AsyncIterableQuery<T>;
```

> Parameters
* `count` - *(required)* number of elements to skip

When *count* is greater than actual number of elements, results in an empty sequence.  
Accepts also a negative count, in which case skips the elements from the end of the sequence.

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync([1, 2, 3, 4, 5]).skip(2).toArray(); // [3, 4, 5]
queryAsync([1, 2, 3, 4, 5]).skip(10).toArray(); // []
queryAsync([1, 2, 3, 4, 5]).skip(-2).toArray(); // [1, 2, 3]
```

`skip` *is a deferred method and is executed only when the result sequence is iterated.*

### `slice`

Returns a sequence that represents the range of elements from start to end.

> Syntax

```ts
slice(start: number, end: number): AsyncIterableQuery<T>;
```

> Parameters
* `start` - *(required)* zero-based index at which to begin extraction
* `end` - *(required)* zero-based index before which to end extraction.

The `end` index is not included in the result.

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync([1, 2, 3, 4, 5]).slice(1, 3).toArray(); // returns [2, 3]
```

`slice` *is a deferred method and is executed only when the result sequence is iterated.*

### `some`

Tests whether at least one element passes the predicate.

> Syntax

```ts
some(predicate: (element: T, index: number) => boolean): Promise<boolean>;
```

> Parameters
* `predicate` - *(required)* function to test for each element

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync([1, 2, 3, 42, 5]).some(elem => elem > 40); // returns true
queryAsync([1, 2, 3, 42, 5]).some(elem => elem < 0); // returns false
```

### `sum`

Returns the sum of all elements.

> Syntax

```ts
sum(): number;
sum(selector: (element: T, index: number) => number): Promise<number>;
```

> Parameters
* `selector` - *(optional)* a value transformer function to apply to each element

Optionally, a function can be provided to apply a transformation and map each element to a value.

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync([1, 2, 3]).sum(); // returns 6
queryAsync([{value: 1}, {value: 2}]).sum(elem => elem.value); // returns 3
```

### `take`

Returns a specified number of elements from the beginning of sequence.

> Syntax

```ts
take(count: number): AsyncIterableQuery<T>;
```

> Parameters
* `count` - *(required)* number of elements to take

If a negative count is specified, returns elements from the end of the sequence.

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync([1, 2, 3]).take(2); // returns [1, 2]
queryAsync([1, 2, 3]).take(-2); // returns [2, 3]
queryAsync([1, 2, 3]).take(10); // returns [1, 2, 3]
```

`take` *is a deferred method and is executed only when the result sequence is iterated.*

### `union`

Returns a set union with a given sequence.

> Syntax

```ts
union(other: AsyncIterable<T>): AsyncIterableQuery<T>;
union<S>(other: AsyncIterable<T>, selector: (element: T) => S): AsyncIterableQuery<T>;
```

> Parameters
* `other` - *(required)* the sequence to join with
* `selector` - *(optional)* a value transformer function to be used for comparisons

Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync([1, 2, 3]]).union([2, 3, 4]).toArray(); // returns [1, 2, 3, 4]

queryAsync([{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'})
  .union([{id: 3, name: 'David'}, {id: 1, name: 'Alice'}], elem => elem.id)
  .toArray();
// returns [
//  {id: 1, name: 'Alice'},
//  {id: 2, name: 'Bob'},
//  {id: 3, name: 'David'}]
```

`union` *is a deferred method and is executed only when the result sequence is iterated.*

### `values`

Returns a sequence of values for each index in the source sequence.

> Syntax

```ts
values(): AsyncIterableQuery<T>;
```

> Example

```ts
import { queryAsync } from 'itiriri-async';

queryAsync([1, 2, 3]]).values().toArray(); // returns [1, 2, 3]
```

`values` *is a deferred method and is executed only when the result sequence is iterated.*



## License

[MIT](LICENSE)

## Keywords

[iterator](https://www.npmjs.com/search?q=keywords:iterator)
[iterable](https://www.npmjs.com/search?q=keywords:iterable)
[async](https://www.npmjs.com/search?q=keywords:async)
[filter](https://www.npmjs.com/search?q=keywords:filter)
[map](https://www.npmjs.com/search?q=keywords:map)
[query](https://www.npmjs.com/search?q=keywords:query)
[collections](https://www.npmjs.com/search?q=keywords:collections)
[deferred](https://www.npmjs.com/search?q=keywords:deferred)
[lazy](https://www.npmjs.com/search?q=keywords:lazy)