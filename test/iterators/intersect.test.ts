import { expect } from 'chai';
import { intersect } from '../../lib/iterators/intersect';
import { toArray } from '../helpers/toArray';
import { fromArray } from '../helpers/asyncGenerators';

describe('iterators/intersect', () => {
  describe('When called on empty sources', () => {
    it('Should return empty source', async () => {
      const source = [];
      const others = [];
      const iterator = intersect(fromArray(source), others, x => x);

      expect(await toArray(iterator)).to.be.deep.equal([]);
    });
  });

  describe('When called on some sources', () => {
    it('Should return all 3 elements', async () => {
      const source = [3, 4, 5];
      const others = [3, 4, 5];
      const iterator = intersect(fromArray(source), others, x => x);

      expect(await toArray(iterator)).to.be.deep.equal([3, 4, 5]);
    });

    it('Should return all 4 elements', async () => {
      const source = [3, 44, 5, 1];
      const others = [3, 1, 5, 44];
      const iterator = intersect(fromArray(source), others, x => x);

      expect(await toArray(iterator)).to.be.deep.equal([3, 44, 5, 1]);
    });

    it('Should return 2 elements', async () => {
      const source = [3, 44, 5, 1];
      const others = [3, 7, 6, 44];
      const iterator = intersect(fromArray(source), others, x => x);

      expect(await toArray(iterator)).to.be.deep.equal([3, 44]);
    });

    it('Should return 1 element', async () => {
      const source = [3, 44, 5, 1, 20];
      const others = [1, 1, 51, 444, 2];
      const iterator = intersect(fromArray(source), others, x => x);

      expect(await toArray(iterator)).to.be.deep.equal([1]);
    });

    it('Should return empty source', async () => {
      const source = [3, 44, 5, 1];
      const others = [11, 11, 51, 414];
      const iterator = intersect(fromArray(source), others, x => x);

      expect(await toArray(iterator)).to.be.deep.equal([]);
    });

    it('Should return empty source', async () => {
      const source = [{ x: 1, y: 'aasdf' }, { x: 2, y: 'fdasd' }];
      const others = [{ x: 2, y: 'asdf' }, { x: 3, y: 'asdf' }];
      const iterator = intersect(fromArray(source), others, x => x.x);

      expect(await toArray(iterator)).to.be.deep.equal([{ x: 2, y: 'fdasd' }]);
    });
  });

  describe('When calling on some Promises', () => {
    it('Should return rejected Promise', async () => {
      // hitting all tests (coverage)
      const source = [
        Promise.resolve(1).finally(),
        Promise.reject(1).finally(),
        Promise.resolve(1)
      ];
      const q = intersect(fromArray(source), [], x => x);

      expect(toArray(q)).to.eventually.be.rejected;
    });
  });
});
