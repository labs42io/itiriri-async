export class SpyAsyncIterable<T> implements AsyncIterable<T> {
  private iterated: boolean = false;
  constructor(private readonly source: AsyncIterable<T>) { }

  get wasIterated() {
    return this.iterated;
  }

  [Symbol.asyncIterator](): AsyncIterator<T> {
    this.iterated = true;
    return this.source[Symbol.asyncIterator]();
  }
}
