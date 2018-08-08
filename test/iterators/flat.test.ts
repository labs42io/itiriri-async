import { expect } from 'chai';
import { flat } from '../../lib/iterators/flat';
import { fromArray } from '../helpers/asyncGenerators';
import { toArray } from '../helpers/toArray';
import { asyncIterator } from '../../lib/utils/asyncIterator';

describe('iterators/flat', () => {
  describe('when called multiple times', () => {
    it('Should return new iterator on each call', async () => {
      const left = fromArray([1, 2, 3]);
      const right = fromArray([4, 5]);
      const source = [left, right];

      expect(flat(source)).not.equals(flat(source));
    });
  });

  describe('When source is empty', () => {
    it('Should return completed iterator', async () => {
      const source = [];
      const it = asyncIterator(flat(source));

      expect(await it.next())
        .to.have.property('done')
        .that.is.true;
    });
  });

  describe('When left source is empty', () => {
    it('Should return elements from right source', async () => {
      const left = fromArray([]);
      const right = fromArray([4, 5]);
      const source = [left, right];
      const iterator = flat(source);
      const result = await toArray(iterator);

      expect(result).to.deep.equal([4, 5]);
    });
  });

  describe('When right source is empty', () => {
    it('Should return elements from left source', async () => {
      const left = fromArray([1, 2, 3]);
      const right = fromArray([]);
      const source = [left, right];
      const iterator = flat(source);
      const result = await toArray(iterator);

      expect(result).to.deep.equal([1, 2, 3]);
    });
  });

  describe('When has multiple iterables with elements', () => {
    it('Should return elements from left source', async () => {
      const source1 = fromArray([1, 2, 3]);
      const source2 = fromArray([4, 5, 1]);
      const source3 = fromArray([42]);

      const source = [source1, source2, source3];
      const iterator = flat(source);
      const result = await toArray(iterator);

      expect(result).to.deep.equal([1, 2, 3, 4, 5, 1, 42]);
    });
  });
});
