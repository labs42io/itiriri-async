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
});
