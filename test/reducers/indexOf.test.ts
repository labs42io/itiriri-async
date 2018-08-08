import { expect } from 'chai';
import { indexOf } from '../../lib/reducers/indexOf';
import { fromArray } from '../helpers/asyncGenerators';

describe('reducers/indexOf', () => {
  describe('When called on empty array', () => {
    it('Should return -1', async () => {
      const source = [];

      expect(await indexOf(fromArray(source), () => true)).to.be.equal(-1);
    });
  });

  describe('When called on some array', () => {
    it('Should return the index 3', async () => {
      const source = [4, 5, 1, 20, 3];

      expect(await indexOf(fromArray(source), elem => elem === 20)).to.be.equal(3);
    });

    it('Should return the index 0', async () => {
      const source = [1, 2, 1, 3, 4];

      expect(await indexOf(fromArray(source), elem => elem === 1)).to.be.equal(0);
    });

    it('Should return -1 if elements does not exist', async () => {
      const source = ['a', 'b', 'z', 'aa', 'abc'];

      expect(await indexOf(fromArray(source), elem => elem === 'c')).to.be.equal(-1);
    });

    it('Should return the index of last element', async () => {
      const source = [5, 7, 1, 3];

      expect(await indexOf(fromArray(source), elem => elem === 3)).to.be.equal(3);
    });
  });

  describe('When called with index depending predicate', () => {
    it('Should return first index', async () => {
      const source = [1, 4, 3, 2];

      expect(await indexOf(fromArray(source), (elem, idx) => idx === 0)).to.be.equal(0);
    });

    it('Should return last index', async () => {
      const source = [1, 4, 3, 2, 5];

      expect(await indexOf(
        fromArray(source),
        (elem, idx) => { return idx * 2 === 4; }),
      ).to.be.equal(2);
    });

    it('Should return the middle index', async () => {
      const source = [1, 40, 3, 200, 1001];

      expect(await indexOf(fromArray(source), (elem, idx) => idx === 2)).to.be.equal(2);
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
      const q = indexOf(fromArray(source), x => x);

      expect(q).to.eventually.be.rejected;
    });
  });

  describe('When calling on 2 Promises', () => {
    it('Should return rejected Promise', async () => {
      // hitting all tests (coverage)
      const source = [
        Promise.reject(1).finally(),
        Promise.resolve(1)
      ];
      const q = indexOf(fromArray(source), x => x);

      expect(q).to.eventually.be.rejected;
    });
  });
});
