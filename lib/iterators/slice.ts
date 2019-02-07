import { take } from './take';
import { skip } from './skip';

export function slice<TElement>(
  source: AsyncIterable<TElement>,
  start?: number,
  end?: number,
): AsyncIterable<TElement> {
  if (start === undefined && end === undefined) {
    return source;
  }

  if (start !== undefined && end === undefined) {
    return skip(source, check(start, 'start'));
  }

  if (start === undefined && end !== undefined) {
    return take(source, check(end, 'end'));
  }

  if (start !== undefined && start < 0) {
    throw new Error('Invalid start range, use positive index.');
  }

  // start !== undefined && end !== undefined
  return skip(take(source, check(<number>end, 'end')), check(<number>start, 'start'));
}

function check(value: number, name: string) {
  if (value < 0) {
    throw new Error(`Invalid ${name} range, use positive index.`);
  }

  return value;
}
