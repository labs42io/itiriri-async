export async function first<TElement>(source: AsyncIterable<TElement>): Promise<TElement> {
  for await (const element of source) {
    return Promise.resolve(element);
  }

  return Promise.resolve(undefined);
}
