import { expect } from 'chai';
import { exclude } from '../../lib/iterators/exclude';
import { fromArray } from '../helpers/asyncGenerators';
import { asyncIterator } from '../../lib/utils/asyncIterator';
import { toArray } from '../helpers/toArray';

describe('iterators/exclude', () => {
  describe('when called multiple times', () => {
    it('Should return new iterator on each call', async () => {
      const left = [1, 2];
      const right = [3, 4, 5];
      const it1 = exclude(fromArray(left), right, x => x);
      const it2 = exclude(fromArray(left), right, x => x);
      expect(it1).not.equals(it2);
    });
  });

  describe('When source is empty', () => {
    it('Should return completed iterator', async () => {
      const left = [];
      const right = [];
      const it = asyncIterator(exclude(fromArray(left), right, x => x));

      expect(await it.next()).to.have.property('done').that.is.true;
    });

    it('Should return completed iterator for non-empty exclusions', async () => {
      const left = [];
      const right = [1, 2, 3];
      const it = asyncIterator(exclude(fromArray(left), right, x => x));

      expect(await it.next()).to.have.property('done').that.is.true;
    });
  });

  describe('When source has elemements', () => {
    describe('And exclusion is empty', () => {
      it('Should return elements from source', async () => {
        const left = [1, 2, 3];
        const right = [];
        const iterator = exclude(fromArray(left), right, x => x);
        const result = await toArray(iterator);

        expect(result).to.deep.equal([1, 2, 3]);
      });
    });

    describe('And is disjoint with exclusion', () => {
      it('Should return elements from source', async () => {
        const left = [1, 2, 3];
        const right = [4, 5];
        const iterator = exclude(fromArray(left), right, x => x);
        const result = await toArray(iterator);

        expect(result).to.deep.equal([1, 2, 3]);
      });
    });

    describe('And source has same elements', () => {
      it('Should return empty iterator', async () => {
        const left = [1, 2, 3];
        const right = [1, 2, 3];
        const it = asyncIterator(exclude(fromArray(left), right, x => x));

        expect(await it.next()).to.have.property('done').that.is.true;
      });
    });

    describe('And source has some elements in common', () => {
      it('Should return correct result', async () => {
        const left = [1, 2, 3];
        const right = [2, 3, 4];
        const iterator = exclude(fromArray(left), right, x => x);
        const result = await toArray(iterator);

        expect(result).to.deep.equal([1]);
      });
    });

    describe('And source has some elements in common', () => {
      it('Should return correct result for a key selector', async () => {
        const elem1 = { p: 1 };
        const elem2 = { p: 2 };
        const elem3 = { p: 3 };
        const elem4 = { p: 4 };
        const left = [elem1, elem2, elem3, { p: 1 }];
        const right = [{ p: 2 }, elem3, elem4];
        const iterator = exclude(fromArray(left), right, x => x.p);
        const result = await toArray(iterator);

        expect(result).to.deep.equal([elem1, { p: 1 }]);
      });
    });

    describe('And source has some duplicate elements in common', () => {
      it('Should return correct result', async () => {
        const left = [1, 1, 2, 3, 3];
        const right = [2, 2, 3, 3, 4];
        const iterator = exclude(fromArray(left), right, x => x);
        const result = await toArray(iterator);

        expect(result).to.deep.equal([1, 1]);
      });
    });
  });
});
