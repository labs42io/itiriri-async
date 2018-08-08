export async function min<TElement>(
  source: AsyncIterable<TElement>,
  compareFn: (element1: TElement, element2: TElement) => number,
): Promise<TElement> {
  let result = undefined;

  for await (const element of source) {
    if (result === undefined || compareFn(element, result) < 0) {
      result = element;
    }
  }

  return result;
}
