import { queryAsync } from "./lib";
import { asyncIterable } from './lib/utils/asyncIterable';

console.log('That awesome library');

const q = queryAsync(asyncIterable(async function* () { yield* [1, 2, 3, 4, 3, 1, -1] }));

async function f() {
  console.log((await q.awaitAll()).sort().toArray());
}

f();