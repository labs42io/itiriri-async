import { expect } from 'chai';
import { queryAsync } from '../lib/QueryAsync';
import { SpyAsyncIterable } from './helpers/SpyAsyncIterable';
import { numbers as numberGenerator } from './helpers/asyncGenerators';

describe('QueryAsync', () => {
  // describe('When calling constructor', () => {
  //   it('Should return a QueryAsync', () => {
  //     const source = [];
  //     const q = query(source);

  //     const methods = [
  //       'entries', 'keys', 'values', 'forEach', 'concat', 'prepend', 'fill',
  //       'toArray', 'toMap', 'toGroups', 'toSet', 'toString', 'filter', 'take',
  //       'skip', 'slice', 'splice', 'join', 'leftJoin', 'rightJoin', 'groupJoin',
  //       'sort', 'shuffle', 'reverse', 'every', 'some', 'includes',
  //       'distinct', 'exclude', 'intersect', 'union', 'map', 'flat', 'groupBy',
  //       'nth', 'indexOf', 'findIndex', 'lastIndexOf', 'findLastIndex', 'length',
  //       'first', 'find', 'last', 'findLast', 'average', 'min',
  //       'max', 'sum', 'reduce', 'reduceRight',
  //     ];

  //     methods.forEach((method) => {
  //       expect(q).to.have.property(method);
  //     });

  //   });
  //   it('Iteration should be deferred', () => {
  //     const source = new SpyIterable([1, 2]);
  //     query(source);

  //     expect(source.wasIterated).to.be.false;
  //   });
  // });

  // describe('When calling skip + take', () => {
  //   it('Should return 4 elemens', () => {
  //     const source = numberGenerator(1, 2);
  //     const q = query(source).skip(2).take(4);

  //     expect(q.toArray()).to.be.deep.equal([5, 7, 9, 11]);
  //   });

  //   it('Should return 1 element', () => {
  //     const source = numberGenerator(1, 2);
  //     const q = query(source).skip(10).take(1);

  //     expect(q.nth(0)).to.be.equal(21);
  //   });
  // });

  // describe('When calling take + sort', () => {
  //   it('Should return 5 elements', () => {
  //     const source = numberGenerator(10, -1);
  //     const q = query(source).take(5).sort();

  //     expect(toArray(q)).to.be.deep.equal([6, 7, 8, 9, 10]);
  //   });
  // });
});
