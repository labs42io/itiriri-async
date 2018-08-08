console.log('Hello World!');

async function* fromArray(arr) {
  for (const e of arr) {
    yield await Promise.resolve(e);
  }
}

async function toArray<T>(iterator: AsyncIterable<T>) {
  const result = [];
  for await (const element of iterator) {
    result.push(element);
  }

  return result;
}

class C<T> implements AsyncIterable<T>{
  constructor(private readonly source: AsyncIterable<T>) {
  }

  [Symbol.asyncIterator](): AsyncIterator<T> {
    return this.source[Symbol.asyncIterator]();
  }

  copy(): C<T> {
    return new C(this.source);
  }
}

async function f() {
  const source = [1, 3, 4, 2, 2];
  const q1 = new C(fromArray(source));
  const q2 = q1.copy();
  const a1 = await toArray(q1);
  const a2 = await toArray(q2);
  console.log('fa1', a1);
  console.log('fa2', a2);
}

async function g() {
  const source = [1, 3, 4, 2, 2];
  const q1 = new C(fromArray(source));
  const q2 = q1.copy();
  const a2 = await toArray(q2);
  const a1 = await toArray(q1);
  console.log('ga1', a1);
  console.log('ga2', a2);
}

async function h() {
  const source = [1, 3, 4, 2, 2];
  const q1 = new C(fromArray(source));
  const q2 = q1.copy();
  const [a1, a2] = await Promise.all([toArray(q2), toArray(q1)]);
  console.log('ha1', a1);
  console.log('ha2', a2);
}

f();
g();
h();

/**
 Output:

 ha1 [ 1, 4, 2 ]
ha2 [ 3, 2 ]
fa1 [ 1, 3, 4, 2, 2 ]
fa2 []
ga1 []
ga2 [ 1, 3, 4, 2, 2 ]

 */
