
import { expect } from 'chai';
import { distinct } from '../../lib/iterators/distinct';
import { fromArray } from '../helpers/asyncGenerators';
import { asyncIterator } from '../../lib/utils/asyncIterator';
import { toArray } from '../helpers/toArray';

describe('iterators/distinct', () => {
  describe('when called multiple times', () => {
    it('Should return new iterator on each call', async () => {
      const source = fromArray([1, 2, 3]);
      const result = distinct(source, x => x);

      expect(asyncIterator(result)).not.equals(asyncIterator(result));
    });
  });

  describe('When source is empty', () => {
    it('Should return completed iterator', async () => {
      const source = [];
      const iterator = distinct(fromArray(source), x => x);

      expect(await toArray(iterator)).to.deep.equal([]);
    });
  });

  describe('When source has unique elements', () => {
    it('Should return the elements', async () => {
      const arr = [1, 2, 3];
      const iterator = distinct(fromArray(arr), x => x);
      const result = await toArray(iterator);

      expect(result).to.deep.equal(arr);
    });
  });

  describe('When source has unique element keys', () => {
    it('Should return the elements', async () => {
      const arr = [{ p: 1 }, { p: 2 }, { p: 3 }];
      const iterator = distinct(fromArray(arr), x => x.p);
      const result = await toArray(iterator);

      expect(result).to.deep.equal(arr);
    });
  });

  describe('When source has all elements same', () => {
    it('Should return the unique element', async () => {
      const arr = [42, 42, 42];
      const iterator = distinct(fromArray(arr), x => x);
      const result = await toArray(iterator);

      expect(result).to.deep.equal([42]);
    });
  });

  describe('When source has duplicate elements', () => {
    it('Should return unique elements', async () => {
      const arr = [1, 42, 2, 42, 42];
      const iterator = distinct(fromArray(arr), x => x);
      const result = await toArray(iterator);

      expect(result).to.deep.equal([1, 42, 2]);
    });
  });

  describe('When source has all element keys same', () => {
    it('Should return the unique element', async () => {
      const elem = { p: 42 };
      const arr = [elem, elem, elem];
      const iterator = distinct(fromArray(arr), x => x.p);
      const result = await toArray(iterator);

      expect(result).to.deep.equal([elem]);
    });
  });

  describe('When source has duplicate element keys', () => {
    it('Should return unique elements by their first occurence', async () => {
      const elem1 = { p: 1 };
      const elem42 = { p: 42 };
      const elem2 = { p: 2 };
      const arr = [elem1, elem42, elem2, { p: 42 }, { p: 42 }];
      const iterator = distinct(fromArray(arr), x => x.p);
      const result = await toArray(iterator);

      expect(result).to.deep.equal([elem1, elem42, elem2]);
    });
  });

  describe('When calling on some rejected Promises', () => {
    it('Should return rejected Promise', async () => {
      const source = [Promise.reject(1)];
      const q = distinct(fromArray(source), x => x);

      expect(toArray(q)).to.eventually.be.rejected;
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
      const q = distinct(fromArray(source), x => x);

      expect(toArray(q)).to.eventually.be.rejected;
    });
  });
});
