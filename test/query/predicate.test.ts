import { expect } from 'chai';
import { queryAsync } from '../../lib/QueryAsync';
import { fromArray } from '../helpers/asyncGenerators';

describe('Query (predicate)', () => {
  describe('When calling includes', () => {
    it('Should return true on array', async () => {
      const source = [0, 4, 4, 30, 10, 10];
      const q = queryAsync(fromArray(source));

      expect(await q.includes(4)).to.be.true;
    });

    it('Should return false on empty source', async () => {
      const source = [];
      const q = queryAsync(fromArray(source));

      expect(await q.includes(0)).to.be.false;
    });

    it('Should return false when using fromIndex', async () => {
      const source = [1, 2, 3, 4];
      const q = queryAsync(fromArray(source));

      expect(await q.includes(1, 1)).to.be.false;
    });
  });

  describe('When calling every', () => {
    it('Should return true on array', async () => {
      const source = [0, 4, 4, 30, 10, 10];
      const q = queryAsync(fromArray(source));

      expect(await q.every(x => x >= 0)).to.be.true;
    });

    it('Should return true on empty source', async () => {
      const source = [];
      const q = queryAsync(fromArray(source));

      expect(await q.every(x => x * 20 === 0)).to.be.true;
    });

    it('Should return false on array of objects', async () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = queryAsync(fromArray(source));

      expect(await q.every(x => x.val <= 10)).to.be.false;
    });

    it('Should return true on array of objects', async () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = queryAsync(fromArray(source));

      expect(await q.every((_, idx) => idx < 10)).to.be.true;
    });
  });

  describe('When calling some', () => {
    it('Should return true on array', async () => {
      const source = [0, 4, 4, 30, 10, 10];
      const q = queryAsync(fromArray(source));

      expect(await q.some(x => x >= 30)).to.be.true;
    });

    it('Should return true on empty source', async () => {
      const source = [];
      const q = queryAsync(fromArray(source));

      expect(await q.some(x => x * 20 === 0)).to.be.false;
    });

    it('Should return false on array of objects', async () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = queryAsync(fromArray(source));

      expect(await q.some(x => x.val < -10)).to.be.false;
    });

    it('Should return true on array of objects', async () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = queryAsync(fromArray(source));

      expect(await q.some((_, idx) => idx < 10)).to.be.true;
    });
  });
});
