import { expect } from 'chai';
import { take } from '../../lib/iterators/take';
import { fromArray } from '../helpers/asyncGenerators';
import { toArray } from '../helpers/toArray';

describe('iterators/take', () => {
  describe('When take 0 elements', () => {
    it('Should return empty source', async () => {
      const source = [1, 2];
      const iterator = take(fromArray(source), 0);

      expect(await toArray(iterator)).to.deep.equal([]);
    });
  });

  describe('When take some elements', () => {
    it('Should return 4 elements from front', async () => {
      const source = [1, 2, 3, 4, 5, 6];
      const iterator = take(fromArray(source), 4);

      expect(await toArray(iterator)).to.deep.equal([1, 2, 3, 4]);
    });
    it('Should return 2 elements from front', async () => {
      const source = [1, 2, 3, 4, 5];
      const iterator = take(fromArray(source), 2);

      expect(await toArray(iterator)).to.deep.equal([1, 2]);
    });
    it('Should return 1 element from front', async () => {
      const source = [1, 2, 3];
      const iterator = take(fromArray(source), 1);

      expect(await toArray(iterator)).to.deep.equal([1]);
    });
  });

  describe('When take all elements', () => {
    it('Should return all elements', async () => {
      const source = [1, 2, 3, 4, 5, 6];
      const iterator = take(fromArray(source), 6);

      expect(await toArray(iterator)).to.deep.equal([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('When take more than all elements', () => {
    it('Should return all elements', async () => {
      const source = [1, 2, 3];
      const iterator = take(fromArray(source), 10);

      expect(await toArray(iterator)).to.deep.equal([1, 2, 3]);
    });
  });

  describe('When take negative count', () => {
    it('Should return 3 elements from tail', async () => {
      const source = [1, 2, 3, 4];

      expect(() => take(fromArray(source), -3)).to.throw(Error);
    });
  });

  describe('When take positive count from empty source', () => {
    it('Should return empty source', async () => {
      const source = [];
      const iterator = take(fromArray(source), 8);

      expect(await toArray(iterator)).to.deep.equal([]);
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
      const q = take(fromArray(source), 1);

      expect(toArray(q)).to.eventually.be.rejected;
    });
  });
});
