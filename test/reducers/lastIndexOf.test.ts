import { expect } from 'chai';
import { lastIndexOf } from '../../lib/reducers/lastIndexOf';
import { fromArray } from '../helpers/asyncGenerators';

describe('reducers/lastIndexOf', () => {
  describe('When called on empty array', () => {
    it('Should return -1', async () => {
      const source = [];

      expect(await lastIndexOf(fromArray(source), () => true)).to.be.equal(-1);
    });
  });

  describe('When called on some array', () => {
    it('Should return the index 3', async () => {
      const source = [4, 5, 1, 20, 3];

      expect(await lastIndexOf(fromArray(source), elem => elem === 20)).to.be.equal(3);
    });

    it('Should return the index 2', async () => {
      const source = [1, 2, 1, 3, 4];

      expect(await lastIndexOf(fromArray(source), elem => elem === 1)).to.be.equal(2);
    });

    it('Should return -1 if elements does not exist', async () => {
      const source = ['a', 'b', 'z', 'aa', 'abc'];
      expect(await lastIndexOf(fromArray(source), elem => elem === 'c')).to.be.equal(-1);
    });
  });

  describe('When called with index depending predicate', () => {
    it('Should return first index', async () => {
      const source = [1, 4, 3, 2];

      expect(await lastIndexOf(fromArray(source), (_, idx) => idx === 0)).to.be.equal(0);
    });

    it('Should return last index', async () => {
      const source = [1, 4, 3, 2, 5];

      expect(await lastIndexOf(
        fromArray(source), (_, idx) => { return idx * 2 === 4; },
      )).to.be.equal(2);
    });

    it('Should return last index for multiple matches', async () => {
      const source = [1, 4, 3, 2, 5];

      expect(await lastIndexOf(
        fromArray(source), (_, idx) => { return idx % 2 === 0; }),
      ).to.be.equal(4);
    });

    it('Should return the middle index', async () => {
      const source = [1, 40, 3, 200, 1001];

      expect(await lastIndexOf(fromArray(source), (_, idx) => idx === 2)).to.be.equal(2);
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
      const q = lastIndexOf(fromArray(source), x => x);

      expect(q).to.eventually.be.rejected;
    });
  });
});
