export async function first<TElement>(source: AsyncIterable<TElement>):
  Promise<TElement | undefined> {

  for await (const element of source) {
    return Promise.resolve(element);
  }

  return undefined;
}
