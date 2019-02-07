import { expect } from 'chai';
import { numbers as numberGenerator, fromArray } from '../helpers/asyncGenerators';
import { SpyAsyncIterable } from '../helpers/SpyAsyncIterable';
import { queryAsync } from '../../lib/QueryAsync';
import { toArray } from '../helpers/toArray';

describe('Query (filter)', () => {
  describe('When calling filter', () => {
    it('Should be a deferred method', async () => {
      const source = new SpyAsyncIterable(numberGenerator());
      queryAsync(source).filter(() => true);

      expect(source.wasIterated).to.be.false;
    });

    it('Should return array of 3 elements', async () => {
      const source = [0, -4, 4, 30, -10, 10];
      const q = queryAsync(fromArray(source)).filter(x => x <= 0);

      expect(await toArray(q)).to.be.deep.equal([0, -4, -10]);
    });

    it('Should return array of 1 element', async () => {
      const source = [0, -4, 4, 30, -10, 10];
      const q = queryAsync(fromArray(source)).filter((_, idx) => idx === 0);

      expect(await toArray(q)).to.be.deep.equal([0]);
    });

    it('Should return array of 1 object', async () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = queryAsync(fromArray(source)).filter(x => x.tag === 'a');

      expect(await toArray(q)).to.be.deep.equal([{ val: 10, tag: 'a' }]);
    });
  });

  describe('When calling skip', () => {
    it('Should be a deferred method', async () => {
      const source = new SpyAsyncIterable(numberGenerator());
      queryAsync(fromArray(source)).skip(1000);

      expect(source.wasIterated).to.be.false;
    });

    it('Should return 5 elements', async () => {
      const source = numberGenerator();
      const q = queryAsync(source).skip(2).take(5);

      expect(await toArray(q)).to.be.deep.equal([2, 3, 4, 5, 6]);
    });
  });

  describe('When calling slice', () => {
    it('Should be a deferred method', async () => {
      const source = new SpyAsyncIterable(numberGenerator());
      queryAsync(source).slice(100, 2000);

      expect(source.wasIterated).to.be.false;
    });

    it('Should return 3 elements', async () => {
      const source = numberGenerator(1, 2);
      const q = queryAsync(source).slice(4, 6);

      expect(await toArray(q)).to.be.deep.equal([9, 11]);
    });

    it('Should return empty source', async () => {
      const source = numberGenerator(10, 2);
      const q = queryAsync(source).slice(7, 6);

      expect(await toArray(q)).to.be.deep.equal([]);
    });

    it('Should return no elements', async () => {
      const source = numberGenerator(10, 2);
      const q = queryAsync(source).slice(0, 0);

      expect(await toArray(q)).to.be.deep.equal([]);
    });
  });
});
