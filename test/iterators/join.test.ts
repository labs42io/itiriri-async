import { expect } from 'chai';
import { join } from '../../lib/iterators/join';
import { fromArray } from '../helpers/asyncGenerators';
import { toArray } from '../helpers/toArray';

describe('iterators/join', () => {
  describe('When called on empty source', () => {
    it('Should return empty source', async () => {
      const source = [];
      const others = [];
      const iterator = join(fromArray(source), others, x => x, x => x, (e1, e2) => ({ e1, e2 }));

      expect(await toArray(iterator)).to.be.deep.equal([]);
    });
  });

  describe('When called on some source', () => {
    it('Should return common values', async () => {
      const source = [1, 2, 3, 4];
      const others = [3, 4, 5, 6];
      const iterator = join(fromArray(source), others, x => x, x => x, x => x);

      expect(await toArray(iterator)).to.be.deep.equal([3, 4]);
    });

    it('Should return objects with common property', async () => {
      const source = [
        { name: 'Football', awesomeness: 20 },
        { name: 'Chess', awesomeness: 30 },
        { name: 'Hockey', awesomeness: 40 },
      ];
      const others = [
        { name: 'Russia', awesomeness: 30 },
        { name: 'Norway', awesomeness: 20 },
        { name: 'France', awesomeness: 40 },
      ];
      const iterator = join(
        fromArray(source),
        others,
        x => x.awesomeness,
        x => x.awesomeness,
        (e1, e2) => 'Playing ' + e1.name + ' in ' + e2.name,
      );

      expect(await toArray(iterator)).to.be.deep.equal([
        'Playing Football in Norway',
        'Playing Chess in Russia',
        'Playing Hockey in France',
      ]);
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
      const q = join(fromArray(source), [], x => x, x => x, x => x);

      expect(toArray(q)).to.eventually.be.rejected;
    });
  });
});
