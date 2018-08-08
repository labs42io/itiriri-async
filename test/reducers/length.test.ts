import { expect } from 'chai';
import { length } from '../../lib/reducers/length';
import { fromArray } from '../helpers/asyncGenerators';

describe('reducers/length', () => {
  describe('When called on empty source', () => {
    it('Should return 0', async () => {
      const source = [];

      expect(await length(fromArray(source))).to.equal(0);
    });
  });

  describe('When called on a non-empty source', () => {
    it('Should return length for 4 elements', async () => {
      const source = [0, 1, 2, 1];

      expect(await length(fromArray(source))).to.equal(4);
    });
    it('Should return length for 1 element', async () => {
      const source = [0];

      expect(await length(fromArray(source))).to.equal(1);
    });
    it('Should return length for 6 elements', async () => {
      const source = [0, 1, 1, 1, 0, 0];

      expect(await length(fromArray(source))).to.equal(6);
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
      const q = length(fromArray(source));

      expect(q).to.eventually.be.rejected;
    });
  });
});
