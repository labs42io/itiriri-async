export async function* empty() { }

export async function* numbers(offset = 0, step = 1) {
  let i = offset;
  while (1) {
    yield await Promise.resolve(i);
    i += step;
  }
}

export async function* fromArray(arr) {
  for (const e of arr) {
    yield await e;
  }
}
