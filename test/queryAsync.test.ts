import { expect } from 'chai';
import { queryAsync } from '../lib/QueryAsync';
import { SpyAsyncIterable } from './helpers/SpyAsyncIterable';
import { fromArray } from './helpers/asyncGenerators';

describe('QueryAsync', () => {
  describe('When calling constructor', () => {
    it('Should return a QueryAsync', () => {
      const source = [];
      const q = queryAsync(fromArray(source));

      const methods = [
        'entries', 'keys', 'values', 'forEach', 'concat', 'prepend',
        'filter', 'take',
        'skip', 'slice', 'join', 'leftJoin', 'groupJoin',
        'every', 'some', 'includes',
        'distinct', 'exclude', 'intersect', 'union', 'map', 'flat',
        'nth', 'indexOf', 'findIndex', 'lastIndexOf', 'findLastIndex', 'length',
        'first', 'find', 'last', 'findLast', 'average', 'min',
        'max', 'sum', 'reduce',
      ];

      methods.forEach((method) => {
        expect(q).to.have.property(method);
      });
    });

    it('Iteration should be deferred', async () => {
      const source = new SpyAsyncIterable(fromArray([1, 2]));
      await queryAsync(source);

      expect(source.wasIterated).to.be.false;
    });
  });
});
