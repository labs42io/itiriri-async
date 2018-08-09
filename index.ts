import { queryAsync } from "./lib";
import { asyncIterable } from './lib/utils/asyncIterable';

console.log('That awesome library');

const q = queryAsync(asyncIterable(async function* () { yield* [1, 2, 3, 4, 3, 1, -1] }));

async function f() {
  console.log((await q.awaitAll()).sort().toArray());
}

f();

async function* generator() {
  yield* [[1, 2, 3], [4, 5]];
}

// (async function () {
//   const q = await queryAsync(generator()).findLastIndex(elem => elem > 2);
//   console.log(q); // returns 5
// })();

(async function () {
  const q = await queryAsync(generator()).flat().awaitAll();
  console.log(q.toArray()); // returns undefined
})();