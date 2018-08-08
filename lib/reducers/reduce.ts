export async function reduce<TElement>(
  source: AsyncIterable<TElement>,
  callback: (accumulator: TElement, current: TElement, index: number) => TElement,
): Promise<TElement>;

export async function reduce<TElement, TAccumulator>(
  source: AsyncIterable<TElement>,
  callback: (accumulator: TAccumulator, current: TElement, index: number) => TAccumulator,
  initialValue: TAccumulator,
): Promise<TAccumulator>;

export async function reduce<TElement>(
  source: AsyncIterable<TElement>,
  callback: (accumulator: any, current: TElement, index: number) => any,
  initialValue?: any,
): Promise<any> {
  let [index, accumulator] = [-1, initialValue];

  for await (const element of source) {
    accumulator = ++index === 0 && initialValue === undefined ?
      element :
      callback(accumulator, element, index);
  }

  if (initialValue === undefined && index === -1) {
    throw new Error('Sequence contains no elements.');
  }

  return accumulator;
}
