import { expect } from 'chai';
import { max } from '../../lib/reducers/max';
import { fromArray } from '../helpers/asyncGenerators';

describe('reducers/max', () => {
  describe('When called on empty array', () => {
    it('Should return undefined', async () => {
      const source = [];

      expect(await max(fromArray(source), (a, b) => a - b)).to.be.undefined;
    });
  });

  describe('When calle on some array', () => {
    it('Should return the first element', async () => {
      const source = [4, 0, 1, 3];

      expect(await max(fromArray(source), (a, b) => a - b)).to.be.equal(4);
    });

    it('Should return the last element', async () => {
      const source = [-1, 0, 1, 3];

      expect(await max(fromArray(source), (a, b) => a - b)).to.be.equal(3);
    });

    it('Should return the middle element', async () => {
      const source = [-10, -2, -11, -13, -664];

      expect(await max(fromArray(source), (a, b) => a - b)).to.be.equal(-2);
    });

    it('Should return 10.99', async () => {
      const source = [0.1, 9.9, 10.99, 10.1];
      expect(await max(fromArray(source), (a, b) => a - b)).to.be.equal(10.99);
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
      const q = max(fromArray(source), x => x);

      expect(q).to.eventually.be.rejected;
    });
  });
});
