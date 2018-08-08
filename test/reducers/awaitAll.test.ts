import { expect } from 'chai';
import { empty, fromArray } from '../helpers/asyncGenerators';
import { awaitAll } from '../../lib/reducers/awaitAll';

describe('reducers/awaitAll', () => {
  describe('When accessing the iterator', () => {
    it('Should return an Iterator', async () => {
      const iterator = await awaitAll(empty());

      expect(iterator[Symbol.iterator]()).to.have.property('next');
    });
  });

  describe('When calling on 3 Promises', () => {
    it('Should return rejected Promise', async () => {
      // hitting all tests (coverage)
      const source = [
        Promise.resolve(1).finally(),
        Promise.reject(1).finally(),
        Promise.resolve(1),
      ];
      const q = awaitAll(fromArray(source));

      expect(q).to.eventually.be.rejected;
    });
  });

  describe('When calling on 2 Promises', () => {
    it('Should return rejected Promise', async () => {
      // hitting all tests (coverage)
      const source = [
        Promise.reject(1).finally(),
        Promise.resolve(1),
      ];
      const q = awaitAll(fromArray(source));

      expect(q).to.eventually.be.rejected;
    });
  });
});
