export async function sum(source: AsyncIterable<number>): Promise<number | undefined> {
  let [result, hasElements] = [0, false];

  for await (const element of source) {
    [result, hasElements] = [result + element, true];
  }

  return hasElements ? result : undefined;
}
