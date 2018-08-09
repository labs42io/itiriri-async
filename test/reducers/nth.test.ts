import { expect } from 'chai';
import { nth } from '../../lib/reducers/nth';
import { fromArray } from '../helpers/asyncGenerators';

const chai = require('chai');
chai.use(require('chai-as-promised'));

describe('reducers/nth', () => {
  describe('When accessing an element that exists', () => {
    it('Should return the element from first position', async () => {
      const source = [1, 2, 3, 4, 5];
      expect(await nth(fromArray(source), 0)).to.be.equal(1);
    });

    it('Should return the element from a middle position', async () => {
      const source = [1, 2, 3, 4, 5];
      expect(await nth(fromArray(source), 2)).to.be.equal(3);
    });

    it('Should return the element from last position', async () => {
      const source = [1, 2, 3, 4, 5];
      expect(await nth(fromArray(source), 4)).to.be.equal(5);
    });
  });

  describe('When accessing an element that does not exist', () => {
    it('Should return undefined (positive index)', async () => {
      const source = [1, 2];
      expect(await nth(fromArray(source), 100)).to.be.undefined;
    });
  });

  describe('When accessing negative index element', () => {
    it('Should throw error', async () => {
      const source = [32, 49, 3, 20];

      expect(nth(fromArray(source), -1)).to.eventually.be.rejected;
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
      const q = nth(fromArray(source), 2);

      q.catch(val => expect(val).to.be.equal(1));
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
      const q = nth(fromArray(source), 1);

      expect(q).to.eventually.be.rejected;
      q.catch(val => expect(val).to.be.equal(1));
    });
  });
});
