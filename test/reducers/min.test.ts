import { expect } from 'chai';
import { min } from '../../lib/reducers/min';
import { fromArray } from '../helpers/asyncGenerators';

describe('reducers/min', () => {
  describe('When called on empty array', () => {
    it('Should return undefined', async () => {
      const source = [];

      expect(await min(fromArray(source), (a, b) => a - b)).to.be.undefined;
    });
  });

  describe('When called on some array', () => {
    it('Should return the first element', async () => {
      const source = [-1, 10, 17, 3];

      expect(await min(fromArray(source), (a, b) => a - b)).to.be.equal(-1);
    });

    it('Should return the last element', async () => {
      const source = [-10, -2, -11, -13, -664];

      expect(await min(fromArray(source), (a, b) => a - b)).to.be.equal(-664);
    });

    it('Should return the middle element', async () => {
      const source = [0.1, 9.9, -10.99, 10.1];

      expect(await min(fromArray(source), (a, b) => a - b)).to.be.equal(-10.99);
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
      const q = min(fromArray(source), x => x);

      expect(q).to.eventually.be.rejected;
    });
  });
});
