import { expect } from 'chai';
import { default as itiririAsync } from '../lib';
import { fromArray } from './helpers/asyncGenerators';
import { SpyAsyncIterable } from './helpers/SpyAsyncIterable';

describe('ItiririAsync', () => {
  describe('When calling constructor', () => {
    it('Should return a ItiririAsync', () => {
      const source = [];
      const q = itiririAsync(fromArray(source));

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
      await itiririAsync(source);

      expect(source.wasIterated).to.be.false;
    });
  });
});
