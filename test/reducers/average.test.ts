import { expect } from 'chai';
import { average } from '../../lib/reducers/average';
import { fromArray } from '../helpers/asyncGenerators';

describe('reducers/average', () => {
  describe('When calling on some integer array', () => {
    it('Should return the average of 4 elements', async () => {
      const source = [0, 2, 2, 4];

      expect(await average(fromArray(source))).to.be.equal(2);
    });

    it('Should return the average of 1 element', async () => {
      const source = [0];

      expect(await average(fromArray(source))).to.be.equal(0);
    });

    it('Should return the average of 2 elements', async () => {
      const source = [0, -2];

      expect(await average(fromArray(source))).to.be.equal(-1);
    });

    it('Should return the average of 5 elements', async () => {
      const source = [11.1, 2.2, 6.7, 14.5, 15.5];

      expect(await average(fromArray(source))).to.be.equal(10.0);
    });
  });

  describe('When calling on empty source', () => {
    it('Should return undefined', async () => {
      const source = [];

      expect(await average(fromArray(source))).to.be.undefined;
    });
  });
});
