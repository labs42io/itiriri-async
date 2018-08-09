import { expect } from 'chai';
import { numbers as numberGenerator, fromArray } from '../helpers/asyncGenerators';
import { SpyIterable } from '../helpers/SpyIterable';
import { SpyAsyncIterable } from '../helpers/SpyAsyncIterable';
import { queryAsync } from '../../lib/QueryAsync';
import { toArray } from '../helpers/toArray';
import { asyncIterable } from '../../lib/utils/asyncIterable';

describe('Query (query)', () => {
  describe('When calling entries', () => {
    it('Should be a deferred method', async () => {
      const source = new SpyAsyncIterable(numberGenerator());
      await queryAsync(source).entries();

      expect(source.wasIterated).to.be.false;
    });

    it('Should return 4 key/value pairs', async () => {
      const source = numberGenerator(0, 2);
      const q = queryAsync(source).take(4).entries();

      expect(await toArray(q)).to.be.deep.equal([[0, 0], [1, 2], [2, 4], [3, 6]]);
    });
  });

  describe('When calling keys', () => {
    it('Should be a deferred method', async () => {
      const source = new SpyAsyncIterable(numberGenerator());
      await queryAsync(source).keys();

      expect(source.wasIterated).to.be.false;
    });

    it('Should return the keys', async () => {
      const source = numberGenerator();
      const q = queryAsync(source).take(10).keys();

      expect(await toArray(q)).to.be.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });

  describe('When calling values', () => {
    it('Should be a deferred method', async () => {
      const source = new SpyAsyncIterable(numberGenerator());
      await queryAsync(source).values();

      expect(source.wasIterated).to.be.false;
    });

    it('Should return a new query with same values', async () => {
      const source = [1, 3, 4, 2, 2];
      const q1 = queryAsync(asyncIterable(() => fromArray(source)));
      const q2 = q1.values();

      expect(q2).to.not.be.equal(q1);
      const [res1, res2] = await Promise.all([toArray(q1), toArray(q2)]);
      expect(res2).to.be.deep.equal(res1);
    });
  });

  describe('When calling concat', () => {
    it('Should be a deferred method', async () => {
      const source1 = new SpyAsyncIterable(numberGenerator());
      const source2 = new SpyAsyncIterable(numberGenerator());
      await queryAsync(source1).take(10).concat(queryAsync(source2).take(5));

      expect(source1.wasIterated).to.be.false;
      expect(source2.wasIterated).to.be.false;
    });

    it('Should return 10 elements', async () => {
      const source1 = numberGenerator(0, 2);
      const source2 = numberGenerator();
      const q1 = queryAsync(source1);
      const q2 = queryAsync(source2).take(5).concat(q1.take(5));

      expect(await toArray(q2)).to.be.deep.equal([0, 1, 2, 3, 4, 0, 2, 4, 6, 8]);
    });

    it('Should return 2 elements', async () => {
      const source = numberGenerator(0, 2);
      const q = queryAsync(source).take(1).concat(Promise.resolve(5));

      expect(await toArray(q)).to.be.deep.equal([0, 5]);
    });

    it('Should return 4 elements', async () => {
      const source = numberGenerator(0, 10);
      const q = queryAsync(source).take(3).concat([1]);

      expect(await toArray(q)).to.be.deep.equal([0, 10, 20, 1]);
    });
  });

  describe('When calling prepend', () => {
    it('Should be a deferred method', async () => {
      const source1 = new SpyAsyncIterable(fromArray([1, 2, 3]));
      const source2 = new SpyAsyncIterable(fromArray([]));
      queryAsync(source1).prepend(source2);

      expect(source1.wasIterated).to.be.false;
      expect(source2.wasIterated).to.be.false;
    });

    it('Should return 6 elemnts', async () => {
      const source1 = numberGenerator(0, 10);
      const source2 = numberGenerator(100, 100);
      const q1 = queryAsync(source1).skip(2).take(3);
      const q2 = queryAsync(source2).prepend(q1).take(6);

      expect(await toArray(q2)).to.be.deep.equal([20, 30, 40, 100, 200, 300]);
    });

    it('Should return 2 elements', async () => {
      const source = [1];
      const q = queryAsync(fromArray(source)).prepend(2);

      expect(await toArray(q)).to.be.deep.equal([2, 1]);
    });

    it('Should return 4 elements', async () => {
      const source = numberGenerator(0, 10);
      const q = queryAsync(source).take(3).prepend([1]);

      expect(await toArray(q)).to.be.deep.equal([1, 0, 10, 20]);
    });
  });
});
