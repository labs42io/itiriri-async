import { expect } from 'chai';
import { default as itiririAsync } from '../../lib';
import { asyncIterable } from '../../lib/utils/asyncIterable';
import { fromArray } from '../helpers/asyncGenerators';
import { SpyAsyncIterable } from '../helpers/SpyAsyncIterable';
import { toArray } from '../helpers/toArray';

describe('ItiririAsync (transformation)', () => {
  describe('When calling map', () => {
    it('Should be a deferred method', async () => {
      const source = new SpyAsyncIterable(fromArray([]));
      await itiririAsync(source).map(x => x);

      expect(source.wasIterated).to.be.false;
    });

    it('Should return array of 3 elements', async () => {
      const source = [0, -4, 4];
      const q = itiririAsync(fromArray(source)).map(x => x <= 0);

      expect(await toArray(q)).to.be.deep.equal([true, true, false]);
    });

    it('Should return array of 4 element', async () => {
      const source = [0, -4, 4, 30];
      const q = itiririAsync(fromArray(source)).map((elem, idx) => elem + idx);

      expect(await toArray(q)).to.be.deep.equal([0, -3, 6, 33]);
    });

    it('Should return array of 1 object', async () => {
      const source = [];
      const q = itiririAsync(fromArray(source)).filter(x => x);

      expect(await toArray(q)).to.be.deep.equal([]);
    });
  });

  describe('When calling flat', () => {
    it('Should be a deferred method', async () => {
      const source = new SpyAsyncIterable(fromArray([]));
      await itiririAsync(source).flat(x => x);

      expect(source.wasIterated).to.be.false;
    });

    it('Should return array of 5 elements', async () => {
      const source = [[1, 2, 3], [4, 5]];
      const q = itiririAsync(fromArray(source)).flat((elem) => {
        const res: number[] = [];

        for (const element of elem) {
          res.push(element);
        }

        return asyncIterable(async function* () { yield* res; });
      });

      expect(await toArray(q)).to.be.deep.equal([1, 2, 3, 4, 5]);
    });
  });
});
