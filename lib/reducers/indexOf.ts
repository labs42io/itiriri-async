export async function indexOf<TElement>(
  source: AsyncIterable<TElement>,
  predicate: (element: TElement, index: number) => boolean,
): Promise<number> {
  let index = -1;

  for await (const element of source) {
    if (predicate(element, ++index)) {
      return index;
    }
  }

  return -1;
}
