import { expect } from 'chai';
import { sum } from '../../lib/reducers/sum';
import { fromArray } from '../helpers/asyncGenerators';

describe('reducers/sum', () => {
  describe('When called on empty array', () => {
    it('Should return undefined', async () => {
      const source = [];

      expect(await sum(fromArray(source))).to.be.undefined;
    });
  });

  describe('When called on some array', () => {
    it('Should return 3', async () => {
      const source = [-1, 0, 1, 3];

      expect(await sum(fromArray(source))).to.be.equal(3);
    });

    it('Should return -40', async () => {
      const source = [-10, -2, -11, -17];

      expect(await sum(fromArray(source))).to.be.equal(-40);
    });

    it('Should return 100.5', async () => {
      const source = [10.1, 15.1, 15.1, 50.1, 10.1];
      expect(await sum(fromArray(source))).to.be.equal(100.5);
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
      const q = sum(fromArray(source));

      expect(q).to.eventually.be.rejected;
    });
  });
});
