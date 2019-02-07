export async function average(source: AsyncIterable<number>): Promise<number | undefined> {
  let [s, n] = [0, 0];

  for await (const element of source) {
    [s, n] = [s + element, n + 1];
  }

  return n > 0 ? s / n : undefined;
}
