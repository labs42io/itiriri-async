import { expect } from 'chai';
import { filter } from '../../lib/iterators/filter';
import { fromArray } from '../helpers/asyncGenerators';
import { asyncIterator } from '../../lib/utils/asyncIterator';
import { toArray } from '../helpers/toArray';

describe('iterators/filter', () => {
  describe('when called multiple times', () => {
    it('Should return new iterator on each call', async () => {
      const source = [1, 2, 3];
      const result = filter(fromArray(source), x => true);

      expect(asyncIterator(result)).not.equals(asyncIterator(result));
    });
  });

  describe('When source is empty', () => {
    it('Should return completed iterator', async () => {
      const source = [];
      const iterator = filter(fromArray(source), x => true);

      expect(await toArray(iterator)).to.deep.equal([]);
    });
  });

  describe('When predicate is always true', () => {
    it('Should return all elements', async () => {
      const source = [1, 2, 3];
      const iterator = filter(fromArray(source), x => true);
      const result = await toArray(iterator);

      expect(result).to.deep.equal([1, 2, 3]);
    });
  });

  describe('When predicate is always false', () => {
    it('Should return completed iterator', async () => {
      const source = [1, 2, 3];
      const iterator = filter(fromArray(source), x => false);

      expect(await toArray(iterator)).to.deep.equal([]);
    });
  });

  describe('When predicate matches odd indexes', () => {
    it('Should return elements', async () => {
      const source = [1, 42, 3, 4242];
      const iterator = filter(fromArray(source), (x, i) => i % 2 === 1);
      const result = await toArray(iterator);

      expect(result).to.deep.equal([42, 4242]);
    });
  });

  describe('When calling on some Promises', () => {
    it('Should return rejected Promise', async () => {
      // hitting all tests (coverage)
      const source = [
        Promise.resolve(1).finally(),
        Promise.reject(1).finally(),
        Promise.resolve(1),
      ];
      const q = filter(fromArray(source), x => x);

      expect(toArray(q)).to.eventually.be.rejected;
    });
  });
});
