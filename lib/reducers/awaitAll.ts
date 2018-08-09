export async function awaitAll<TElement>(
  source: AsyncIterable<TElement>,
): Promise<Iterable<TElement>> {

  const buffer: TElement[] = [];
  for await (const element of source) {
    buffer.push(element);
  }

  return buffer;
}
