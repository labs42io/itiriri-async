import { expect } from 'chai';
import { default as itiririAsync } from '../../lib';
import { fromArray } from '../helpers/asyncGenerators';
import { SpyAsyncIterable } from '../helpers/SpyAsyncIterable';
import { SpyIterable } from '../helpers/SpyIterable';
import { toArray } from '../helpers/toArray';

describe('ItiririAsync (join)', () => {
  describe('When calling join', () => {
    it('Should be a deferred method', async () => {
      const source1 = new SpyAsyncIterable(fromArray([]));
      const source2 = new SpyIterable([]);
      await itiririAsync(source1).join(source2, x => x, x => x, x => x);

      expect(source1.wasIterated).to.be.false;
      expect(source2.wasIterated).to.be.false;
    });

    it('Should return array of 2 elements', async () => {
      const source1 = [0, 4, 5, 1];
      const source2 = [-1, 4, 5, -1];
      const q = itiririAsync(fromArray(source1)).join(source2, x => x, x => x, x => x);

      expect(await toArray(q)).to.deep.equal([4, 5]);
    });

    it('Should return array of 3 elements', async () => {
      const source1 = [
        { val: 1, tag: 'a' },
        { val: 11, tag: 'b' },
        { val: 111, tag: 'a' },
        { val: 1111, tag: 'c' },
      ];
      const source2 = [
        { val: 2, tag: 'a' },
        { val: 2222, tag: 'c' },
      ];
      const q = itiririAsync(fromArray(source1)).join(
        source2,
        x => x.tag,
        x => x.tag,
        (e1, e2) => e1.val + e2.val,
      );

      expect(await toArray(q)).to.deep.equal([3, 113, 3333]);
    });
  });

  describe('When calling leftJoin', () => {
    it('Should be a deferred method', async () => {
      const source1 = new SpyAsyncIterable(fromArray([]));
      const source2 = new SpyIterable([]);
      await itiririAsync(source1).leftJoin(source2, x => x, x => x, x => x);

      expect(source1.wasIterated).to.be.false;
      expect(source2.wasIterated).to.be.false;
    });

    it('Should return array of 4 elements', async () => {
      const source1 = [0, 4, 5, 1];
      const source2 = [-1, 4, 5, -1];
      const q = itiririAsync(fromArray(source1)).leftJoin(
        source2,
        x => x,
        x => x,
        (e1, e2) => ({ e1, e2 }),
      );

      expect(await toArray(q)).to.deep.equal([
        { e1: 0, e2: undefined },
        { e1: 4, e2: 4 },
        { e1: 5, e2: 5 },
        { e1: 1, e2: undefined },
      ]);
    });
  });

  describe('When calling groupJoin', () => {
    it('Should be a deferred method', async () => {
      const source1 = new SpyAsyncIterable(fromArray([]));
      const source2 = new SpyIterable([]);
      await itiririAsync(source1).groupJoin(source2, x => x, x => x, x => x);

      expect(source1.wasIterated).to.be.false;
      expect(source2.wasIterated).to.be.false;
    });

    it('Should return array of 1 elements', async () => {
      const source1 = [0, 4, 5, 1];
      const source2 = [-1, 5, 5, 5, 1];
      const q = itiririAsync(fromArray(source1)).groupJoin(
        source2,
        x => x,
        x => x,
        (e1, e2) => ({ e1, e2 }),
      );

      expect(await toArray(q)).to.deep.equal([
        { e1: 0, e2: [] },
        { e1: 4, e2: [] },
        { e1: 5, e2: [5, 5, 5] },
        { e1: 1, e2: [1] },
      ]);
    });
  });
});
