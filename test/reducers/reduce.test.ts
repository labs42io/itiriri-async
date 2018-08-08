import { expect } from 'chai';
import { reduce } from '../../lib/reducers/reduce';
import { fromArray } from '../helpers/asyncGenerators';

const chai = require('chai');
chai.use(require('chai-as-promised'));

describe('reducers/reduce', () => {
  describe('When called without initial value', () => {
    it('Should throw on empty source', async () => {
      const source = [];

      expect(reduce(fromArray(source), () => 1))
        .to.eventually.be.rejectedWith('Sequence contains no elements.');
    });

    it('Should calculate the sum of elements', async () => {
      const source = [1, 2, 3];

      expect(await reduce(fromArray(source), (a, b) => a + b)).to.equal(6);
    });

    it('Should calculate the sum of squares', async () => {
      const source = [2, 0, 4, 9];

      // 2 + 0^2 + 4^2 + 9^2 = 201
      expect(await reduce(fromArray(source), (a, b) => a + b * b)).to.equal(99);
    });

    it('Should calculate sum of indexes multiplied by 2', async () => {
      const source = [5, 7, 1, 9];

      // 5{initial element} + (1 + 1) * 2 + (2 + 1) * 2 + (3 + 1) * 2 = 23
      expect(await reduce(fromArray(source), (a, b, idx) => a + (idx + 1) * 2)).to.equal(23);
    });
  });

  describe('When called with initial value', () => {
    it('Should return the initial value on an empty source', async () => {
      const source = [];

      expect(await reduce(fromArray(source), () => 1, 42)).to.equal(42);
    });

    it('Should calculate the sum of elements plus 4', async () => {
      const source = [1, 2, 3];

      expect(await reduce(fromArray(source), (a, b) => a + b, 4)).to.equal(10);
    });

    it('Should calculate the sum of squares plus 100', async () => {
      const source = [2, 0, 4, 9];

      // 100 + 2^2 + 0^2 + 4^2 + 9^2 = 201
      expect(await reduce(fromArray(source), (a, b) => a + b * b, 100)).to.equal(201);
    });

    it('Should calculate sum of indexes multiplied by 2', async () => {
      const source = [5, 7, 1, 9];

      // 1{initial element} + (0 + 1) * 2 + (1 + 1) * 2 + (2 + 1) * 2 + (3 + 1) * 2 = 21
      expect(await reduce(fromArray(source), (a, b, idx) => a + (idx + 1) * 2, 1)).to.equal(21);
    });
  });
});
