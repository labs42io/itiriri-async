import { expect } from 'chai';
import { skip } from '../../lib/iterators/skip';
import { fromArray } from '../helpers/asyncGenerators';
import { toArray } from '../helpers/toArray';

describe('iterators/skip', () => {
  describe('When called on empty array', () => {
    it('Should return empty array', async () => {
      const source = [];
      const iterator = skip(fromArray(source), 1);

      expect(await toArray(iterator)).to.be.deep.equal([]);
    });
  });

  describe('When skipping all elements', () => {
    it('Should return empty array', async () => {
      const source = [1, 2, 4, 8, 16, 32, 64];
      const iterator = skip(fromArray(source), 100);

      expect(await toArray(iterator)).to.be.deep.equal([]);
    });
  });

  describe('When skipping some elements', () => {
    it('Should return the remaining array', async () => {
      const source = [1, 2, 4, 8, 16];
      const iterator = skip(fromArray(source), 2);

      expect(await toArray(iterator)).to.be.deep.equal([4, 8, 16]);
    });
    it('Should return the remaining array', async () => {
      const source = [1, 2, 4, 8];
      const iterator = skip(fromArray(source), 0);

      expect(await toArray(iterator)).to.be.deep.equal([1, 2, 4, 8]);
    });
    it('Should return the remaining array', async () => {
      const source = [1, 2, 4, 8, 16, 32];
      const iterator = skip(fromArray(source), 4);

      expect(await toArray(iterator)).to.be.deep.equal([16, 32]);
    });
  });

  describe('When skipping negative count', () => {
    it('Should throw error', async () => {
      const source = [];

      expect(() => skip(fromArray(source), -1)).to.throw(Error);
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
      const q = skip(fromArray(source), 1);

      expect(toArray(q)).to.eventually.be.rejected;
    });
  });
});
