import { expect } from 'chai';
import { concat } from '../../lib/iterators/concat';
import { asyncIterator } from '../../lib/utils/asyncIterator';
import { empty, fromArray } from '../helpers/asyncGenerators';

describe('iterators/concat', () => {
  describe('When accessing the iterator', () => {
    it('Should return an AsyncIterator', async () => {
      const iterator = concat(empty(), empty());

      expect(asyncIterator(iterator)).to.have.property('next');
    });
  });

  describe('When called on empty source', () => {
    it('Should return empty source', async () => {
      const iterator = concat(empty(), empty());

      expect(await asyncIterator(iterator).next()).to.have.property('done').that.is.true;
    });
  });

  describe('When called on some sources', () => {
    it('Should return 4 elements', async () => {
      const iterator = concat(fromArray([13]), fromArray([11, -1, 1]));
      const expectedValues = [13, 11, -1, 1];
      let i = 0;

      for await (const element of iterator) {
        expect(element).to.be.equal(expectedValues[i++]);
      }
    });
  });
});
