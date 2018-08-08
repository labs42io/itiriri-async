export async function forEach<T>(
  source: AsyncIterable<T>,
  action: (element: T, index: number) => void,
): Promise<void> {
  let index = 0;
  for await (const element of source) {
    action(element, index++);
  }
}
