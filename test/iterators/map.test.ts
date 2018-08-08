import { expect } from 'chai';
import { map } from '../../lib/iterators/map';
import { fromArray } from '../helpers/asyncGenerators';
import { toArray } from '../helpers/toArray';

describe('iterators/map', () => {
  describe('When applying identity transformation', () => {
    it('Should return the same elements', async () => {
      const source = [1, 2, 4, 8, 16];
      const iterator = map(fromArray(source), (elem, idx) => elem);

      expect(await toArray(iterator)).to.be.deep.equal([1, 2, 4, 8, 16]);
    });
    it('Should return the same elements', async () => {
      const source = [1.1, 2.2, 4.4, 8.8, 16.16];
      const iterator = map(fromArray(source), (elem, idx) => elem);

      expect(await toArray(iterator)).to.be.deep.equal([1.1, 2.2, 4.4, 8.8, 16.16]);
    });
  });

  describe('When applying linear transformation', () => {
    it('Should return the elemens modified', async () => {
      const source = [1, 2, 4, 8];
      const iterator = map(fromArray(source), (elem, idx) => elem * 2 + 2);

      expect(await toArray(iterator)).to.be.deep.equal([4, 6, 10, 18]);
    });
    it('Should return the elemens modified', async () => {
      const source = ['a', 'b', 'c', 'd'];
      const iterator = map(fromArray(source), (elem, idx) => elem + 'a');

      expect(await toArray(iterator)).to.be.deep.equal(['aa', 'ba', 'ca', 'da']);
    });
  });

  describe('When called on empty source', () => {
    it('Should return empty source', async () => {
      const source = [];
      const iterator = map(fromArray(source), (elem, idx) => elem + idx + 1234);

      expect(await toArray(iterator)).to.be.deep.equal([]);
    });
  });

  describe('When applying index transformation', () => {
    it('Should return the array indexes', async () => {
      const source = [10, 1, 1, 2, 3];
      const iterator = map(fromArray(source), (elem, idx) => idx);

      expect(await toArray(iterator)).to.be.deep.equal([0, 1, 2, 3, 4]);
    });
  });

  describe('When applying index and value transformation', () => {
    it('Should return the index+value array', async () => {
      const source = [2, 3, 4, 3, 2];
      const iterator = map(fromArray(source), (elem, idx) => idx + elem);

      expect(await toArray(iterator)).to.be.deep.equal([2, 4, 6, 6, 6]);
    });

    it('Should return the object.property + 2*index', async () => {
      const source = [{ karma: 2 }, { karma: 4 }];
      const iterator = map(fromArray(source), (elem, idx) => elem.karma + 2 * idx);

      expect(await toArray(iterator)).to.be.deep.equal([2, 6]);
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
      const q = map(fromArray(source), x => x);

      expect(toArray(q)).to.eventually.be.rejected;
    });
  });
});
