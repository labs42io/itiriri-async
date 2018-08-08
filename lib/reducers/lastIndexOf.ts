export async function lastIndexOf<TElement>(
  source: AsyncIterable<TElement>,
  predicate: (element: TElement, index: number) => boolean,
): Promise<number> {
  let [result, index] = [-1, -1];

  for await (const element of source) {
    if (predicate(element, ++index)) {
      result = index;
    }
  }

  return result;
}
