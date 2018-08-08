import { expect } from 'chai';
import { groupJoin } from '../../lib/iterators/groupJoin';
import { fromArray } from '../helpers/asyncGenerators';
import { toArray } from '../helpers/toArray';

describe('iterators/groupJoin', () => {
  describe('When called on empty sources', () => {
    it('Should return empty sources', async () => {
      const source = [];
      const others = [];
      const iterator = groupJoin(fromArray(source), others, x => x, x => x, x => x);

      expect(await toArray(iterator)).to.be.deep.equal([]);
    });
  });

  describe('When called on some sources', () => {
    it('Should return 3 grupped elemnts', async () => {
      const source = [1, 2, 3];
      const others = [2, 2, 3, 3, 3, 4, 4];
      const iterator = groupJoin(fromArray(source), others, x => x, x => x, (x, y) => ({ x, y }));

      expect(await toArray(iterator)).to.be.deep.equal([
        { x: 1, y: [] },
        { x: 2, y: [2, 2] },
        { x: 3, y: [3, 3, 3] },
      ]);
    });

    it('Should return 2 grupped elemnts', async () => {
      const source = [
        { val: 2, other: 'asdf' },
        { val: 3, other: 'ad' },
      ];
      const others = [
        { val: 3, y: 'a' },
        { val: 3, y: 'b' },
      ];
      const iterator = groupJoin(
        fromArray(source),
        others,
        x => x.val,
        x => x.val,
        (x, y) => ({ y, x: x.val }),
      );

      expect(await toArray(iterator)).to.be.deep.equal([
        { x: 2, y: [] },
        { x: 3, y: [{ val: 3, y: 'a' }, { val: 3, y: 'b' }] },
      ]);
    });
  });
});
