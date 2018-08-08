import { expect } from 'chai';
import { first } from '../../lib/reducers/first';
import { fromArray } from '../helpers/asyncGenerators';

describe('reducers/first', () => {
  describe('When calling on some source', () => {
    it('Should return the first element', async () => {
      const arr = [1, 2, 3];

      expect(await first(fromArray(arr))).to.be.equal(1);
    });

    it('Should return the first negative element', async () => {
      const arr = [-1, 2, 3];

      expect(await first(fromArray(arr))).to.be.equal(-1);
    });

    it('Should return the first object element', async () => {
      const arr = [{}, 1, 2, 3];

      expect(await first(fromArray(arr))).to.be.equal(arr[0]);
    });
  });

  describe('When calling on empty source', () => {
    it('Should return undefined', async () => {
      const arr = [];

      expect(await first(fromArray(arr))).to.be.undefined;
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
      const q = first(fromArray(source));

      expect(q).to.eventually.be.rejected;
    });
  });

  describe('When calling on rejected Promises', () => {
    it('Should return rejected Promise', async () => {
      // hitting all tests (coverage)
      const source = [
        Promise.reject(1).finally(),
        Promise.resolve(1)
      ];
      const q = first(fromArray(source));

      expect(q).to.eventually.be.rejected;
    });
  });
});
