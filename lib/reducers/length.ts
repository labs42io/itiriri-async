export async function length<TElement>(source: AsyncIterable<TElement>): Promise<number> {
  let cnt = 0;

  for await (const element of source) {
    cnt++;
  }

  return cnt;
}
