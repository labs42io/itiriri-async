export async function last<TElement>(source: AsyncIterable<TElement>): Promise<TElement> {
  let value = undefined;

  for await (const element of source) {
    value = element;
  }

  return value;
}
