export async function nth<TElement>(
  source: AsyncIterable<TElement>,
  index: number,
): Promise<TElement | undefined> {
  if (index < 0) {
    throw Error('Negative index is not supported, use await and sync iterator instead.');
  }

  let n = index;

  for await (const element of source) {
    if (!n--) {
      return element;
    }
  }
}
