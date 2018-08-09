# code review

* Prefer method overloading over optional params in:
  * `AsyncIterableFilter.slice`
  * `AsyncIterableJoin.leftJoin`
  * `AsyncIterablePredicate.includes`

* `concat` allows to add an async iterable, or a promise; `prepend` adds also an async iterable or a value. Methods should have similar signatures and both accept:
  * an async iterable
  * a promise
  * a direct value
  * if possible to easily implement, should also accept a simple iterable

* `queryAsync` should also accept a simple iterable. If this already works make sure we covered it with a test.
* Package `itiriri` is added to dependencies.
  * Could we consider `awaitAll` to return a `Promise<IterableQuery>`?

* We need to an examples folder.