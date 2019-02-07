export async function max<TElement>(
  source: AsyncIterable<TElement>,
  compareFn: (element1: TElement, element2: TElement) => number,
): Promise<TElement | undefined> {
  let result: TElement | undefined = undefined;

  for await (const element of source) {
    if (result === undefined || compareFn(element, result) > 0) {
      result = element;
    }
  }

  return result;
}
