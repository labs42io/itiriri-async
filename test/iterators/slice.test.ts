import { expect } from 'chai';
import { slice } from '../../lib/iterators/slice';
import { fromArray } from '../helpers/asyncGenerators';
import { asyncIterator } from '../../lib/utils/asyncIterator';
import { toArray } from '../helpers/toArray';

describe('iterators/slice', () => {
  describe('when called multiple times', () => {
    it('Should return new iterator on each call', async () => {
      const source = slice(fromArray([1, 2]), 0, 1);

      expect(asyncIterator(source)).not.equals(asyncIterator(source));
    });
  });

  describe('When called without start and end', () => {
    it('Should return the same source', async () => {
      const source = [1, 2, 3, 1];
      const it = slice(fromArray(source));

      expect(await toArray(it)).to.be.deep.equal([1, 2, 3, 1]);
    });
  });

  describe('When start is negative', () => {
    it('Should throw error', async () => {
      const source = [4, 5, 3, 1, 2];

      expect(() => toArray(slice(fromArray(source), -10))).to.throw(Error);
    });
  });

  describe('When start is undefined and end is provided', () => {
    it('Should return array of 3 elements', async () => {
      const source = [4, 5, 3, 2, 5, 4, 3];
      const iter = slice(fromArray(source), undefined, 4);

      expect(await toArray(iter)).to.be.deep.equal([4, 5, 3, 2]);
    });
  });

  describe('When end is negative', () => {
    it('Should throw exception', async () => {
      const source = [];

      expect(() => toArray(slice(fromArray(source), 0, -1))).to.throw(Error);
    });
  });

  describe('When called with start only', () => {
    it('Should return array of 3 elements', async () => {
      const source = [1, 3, 4, 2];
      const iter = slice(fromArray(source), 1);

      expect(await toArray(iter)).to.be.deep.equal([3, 4, 2]);
    });
  });

  describe('When called with start and end', () => {
    it('Should return array of 2 elements', async () => {
      const source = [1, 3, 4, 2, 1];
      const iter = slice(fromArray(source), 1, 3);

      expect(await toArray(iter)).to.be.deep.equal([3, 4]);
    });
  });

  describe('When calling on some Promises', () => {
    it('Should return rejected Promise', async () => {
      // hitting all tests (coverage)
      const source = [
        Promise.resolve(1).finally(),
        Promise.reject(1).finally(),
        Promise.resolve(1)
      ];
      const q = slice(fromArray(source), 0, 1);

      expect(toArray(q)).to.eventually.be.rejected;
    });
  });
});
