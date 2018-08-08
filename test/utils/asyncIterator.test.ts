import { expect } from 'chai';
import { asyncIterator } from '../../lib/utils/asyncIterator';
import { empty, fromArray } from '../helpers/asyncGenerators';

describe('utils/asyncIterator', () => {
  describe('When called on empty source', () => {
    it('Should return an iterator', async () => {
      const it = asyncIterator(empty());

      expect(it).to.have.property('next');
    });

    it('Should return completed iterator', async () => {
      const it = asyncIterator(empty());

      expect(await it.next()).to.have.property('done').that.is.true;
    });

    it('Should return undefined next value', async () => {
      const it = asyncIterator(empty());

      expect(await it.next()).to.have.property('value').that.is.undefined;
    });
  });

  describe('When called on source with one element', () => {
    it('Should iterate through element', async () => {
      const it = asyncIterator(fromArray([13]));

      let current = await it.next();
      expect(current).to.have.property('value').that.is.equal(13);
      expect(current).to.have.property('done').that.is.false;

      current = await it.next();
      expect(current).to.have.property('value').that.is.undefined;
      expect(current).to.have.property('done').that.is.true;
    });
  });

  describe('When called on array with multiple elements', () => {
    it('Should iterate through elements', async () => {
      const it = asyncIterator(fromArray([11, -1, 1]));

      let current = await it.next();
      expect(current).to.have.property('value').that.is.equal(11);
      expect(current).to.have.property('done').that.is.false;

      current = await it.next();
      expect(current).to.have.property('value').that.is.equal(-1);
      expect(current).to.have.property('done').that.is.false;

      current = await it.next();
      expect(current).to.have.property('value').that.is.equal(1);
      expect(current).to.have.property('done').that.is.false;

      current = await it.next();
      expect(current).to.have.property('value').that.is.undefined;
      expect(current).to.have.property('done').that.is.true;
    });
  });

  describe('When called multiple times', () => {
    it('Should return new iterator on each call', async () => {
      const iterator1 = asyncIterator(empty());
      const iterator2 = asyncIterator(empty());

      expect(iterator1).not.equals(iterator2);
    });
  });
});
