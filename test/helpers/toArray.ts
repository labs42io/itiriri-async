export async function toArray<T>(iterator: AsyncIterable<T>) {
  const result = [];
  for await (const element of iterator) {
    result.push(element);
  }

  return result;
}
