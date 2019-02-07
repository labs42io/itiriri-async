export async function last<TElement>(source: AsyncIterable<TElement>):
  Promise<TElement | undefined> {

  let value: TElement | undefined = undefined;

  for await (const element of source) {
    value = element;
  }

  return value;
}
