import { default as itiriri, IterableQuery } from 'itiriri';

export async function awaitAll<TElement>(
  source: AsyncIterable<TElement>,
): Promise<IterableQuery<TElement>> {

  const buffer: TElement[] = [];
  for await (const element of source) {
    buffer.push(element);
  }

  return itiriri(buffer);
}
