import { expect } from 'chai';
import { last } from '../../lib/reducers/last';
import { fromArray } from '../helpers/asyncGenerators';

describe('reducers/last', () => {
  describe('When called on empty array', () => {
    it('Should return undefined', async () => {
      const source = [];

      expect(await last(fromArray(source))).to.be.undefined;
    });
  });

  describe('When called on array with one element', () => {
    it('Should return the element', async () => {
      const source = [101];

      expect(await last(fromArray(source))).to.be.equal(101);
    });
  });

  describe('When called on array with multiple elements', () => {
    it('Should return the last element (4th)', async () => {
      const source = [1, 2, 3, 4];

      expect(await last(fromArray(source))).to.be.equal(4);
    });
  });

  describe('When called on array with multiple elements', () => {
    it('Should return the last element (5th)', async () => {
      const source = ['a', 'b', 'c', 'd', 'asdf'];

      expect(await last(fromArray(source))).to.be.equal('asdf');
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
      const q = last(fromArray(source));

      expect(q).to.eventually.be.rejected;
    });
  });
});
