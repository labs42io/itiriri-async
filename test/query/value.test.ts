import { expect } from 'chai';
import { numbers as numberGenerator, fromArray } from '../helpers/asyncGenerators';
import { queryAsync } from '../../lib/QueryAsync';

const chai = require('chai');
chai.use(require('chai-as-promised'));

describe('Query (value)', () => {
  describe('When calling nth with positive index', () => {
    it('Should return first element', async () => {
      const source = numberGenerator();
      const q = queryAsync(source);

      expect(await q.nth(3)).to.be.equal(3);
    });
  });

  describe('When calling nth with negative index', () => {
    it('Should return last element', async () => {
      const source = numberGenerator();
      const q = queryAsync(source).take(100);

      expect(q.nth(-1)).to.eventually.be.rejected;
    });
  });

  describe('When calling indexOf', () => {
    it('Should return first element index', async () => {
      const source = numberGenerator(0, 3);
      const q = queryAsync(source);

      expect(await q.indexOf(0)).to.be.equal(0);
    });

    it('Should return 5th element index', async () => {
      const source = numberGenerator(0, 3);
      const q = queryAsync(source);

      expect(await q.indexOf(12)).to.be.equal(4);
    });

    it('Should return 2nd element index', async () => {
      const source = [2, 2, 2, 3, 4];
      const q = queryAsync(fromArray(source));

      expect(await q.indexOf(2, 1)).to.be.equal(1);
    });
  });

  describe('When calling lastIndexOf', () => {
    it('Should return first element index', async () => {
      const source = [1, 3, 4, 33, 2, 4];
      const q = queryAsync(fromArray(source));

      expect(await q.lastIndexOf(1)).to.be.equal(0);
    });

    it('Should return last element index', async () => {
      const source = [1, 3, 4, 33, 2, 4];
      const q = queryAsync(fromArray(source));

      expect(await q.lastIndexOf(4)).to.be.equal(5);
    });

    it('Should return 5th element index', async () => {
      const source = [0, 1, 0, 0, 0, 2, 2, 2];
      const q = queryAsync(fromArray(source));

      expect(await q.lastIndexOf(0)).to.be.equal(4);
    });

    it('Should retrun -1', async () => {
      const source = [1, 1, 2, 3, 4, 1, 4];
      const q = queryAsync(fromArray(source));

      expect(await q.lastIndexOf(2, 3)).to.be.equal(-1);
    });
  });

  describe('When calling findIndex', () => {
    it('Should return first element index', async () => {
      const source = [1, 3, 4, 33, 2, 4];
      const q = queryAsync(fromArray(source));

      expect(await q.findIndex(x => x === 1)).to.be.equal(0);
    });

    it('Should return last element index', async () => {
      const source = [0, 1, 1, 1, 2, 44];
      const q = queryAsync(fromArray(source));

      expect(await q.findIndex(x => x - 10 > 30)).to.be.equal(5);
    });

    it('Should return 5th element index', async () => {
      const source = [0, 1, 0, 0, -1, 2, 2, 2];
      const q = queryAsync(fromArray(source));

      expect(await q.findIndex(x => x < 0)).to.be.equal(4);
    });

    it('Should return -1', async () => {
      const source = [0, 1, 0, 0, 1, 2, 2, 2];
      const q = queryAsync(fromArray(source));

      expect(await q.findIndex(x => x < 0)).to.be.equal(-1);
    });
  });

  describe('When calling findLastIndex', () => {
    it('Should return first element index', async () => {
      const source = [1, 3, 4, 33, 2, 4];
      const q = queryAsync(fromArray(source));

      expect(await q.findLastIndex(x => x === 1)).to.be.equal(0);
    });

    it('Should return last element index', async () => {
      const source = [100, 1, 1, 1, 2, 44];
      const q = queryAsync(fromArray(source));

      expect(await q.findLastIndex(x => x - 10 > 30)).to.be.equal(5);
    });

    it('Should return 5th element index', async () => {
      const source = [0, 1, 0, 0, -1, 2, 2, 2];
      const q = queryAsync(fromArray(source));

      expect(await q.findLastIndex(x => x < 0)).to.be.equal(4);
    });

    it('Should return -1', async () => {
      const source = [0, 1, 0, 0, 1, 2, 2, 2];
      const q = queryAsync(fromArray(source));

      expect(await q.findLastIndex(x => x < 0)).to.be.equal(-1);
    });
  });

  describe('When calling length', () => {
    it('Should return 6', async () => {
      const source = [1, 3, 4, 33, 2, 4];
      const q = queryAsync(fromArray(source));

      expect(await q.length()).to.be.equal(6);
    });

    it('Should return 1', async () => {
      const source = [1, 3, 4, 33, 2, 4];
      const q = queryAsync(fromArray(source));

      expect(await q.length(x => x > 10)).to.be.equal(1);
    });

    it('Should return 3', async () => {
      const source = [1, 3, 4, 33, 2, 4];
      const q = queryAsync(fromArray(source));

      expect(await q.length((elem, idx) => idx > 2)).to.be.equal(3);
    });
  });

  describe('When calling first', () => {
    it('Should return 6', async () => {
      const source = [6, 3, 4, 33, 2, 4];
      const q = queryAsync(fromArray(source));

      expect(await q.first()).to.be.equal(6);
    });

    it('Should return undefined', async () => {
      const source = [];
      const q = queryAsync(fromArray(source));

      expect(await q.first()).to.be.undefined;
    });

    it('Should return 3', async () => {
      const source = numberGenerator(3, 0);
      const q = queryAsync(source);

      expect(await q.first()).to.be.equal(3);
    });
  });

  describe('When calling find', () => {
    it('Should return 33', async () => {
      const source = [6, 3, 4, 33, 2, 4];
      const q = queryAsync(fromArray(source));

      expect(await q.find(x => x > 30)).to.be.equal(33);
    });

    it('Should return undefined', async () => {
      const source = [1, 2];
      const q = queryAsync(fromArray(source));

      expect(await q.find((elem, idx) => elem + idx === 0)).to.be.undefined;
    });

    it('Should return first element', async () => {
      const source = numberGenerator(3, 3);
      const q = queryAsync(source).take(10);

      expect(await q.find(x => x === 3)).to.be.equal(3);
    });

    it('Should return 33', async () => {
      const source = numberGenerator(3, 3);
      const q = queryAsync(source);

      expect(await q.find((elem, idx) => idx === 10)).to.be.equal(33);
    });
  });

  describe('When calling last', () => {
    it('Should return 4', async () => {
      const source = [6, 3, 4, 33, 2, 4];
      const q = queryAsync(fromArray(source));

      expect(await q.last()).to.be.equal(4);
    });

    it('Should return undefined', async () => {
      const source = [];
      const q = queryAsync(fromArray(source));

      expect(await q.last()).to.be.undefined;
    });
  });

  describe('When calling findLast', () => {
    it('Should return 33', async () => {
      const source = [6, 3, 4, 33, 2, 4];
      const q = queryAsync(fromArray(source));

      expect(await q.findLast(x => x > 30)).to.be.equal(33);
    });

    it('Should return undefined', async () => {
      const source = [1, 2];
      const q = queryAsync(fromArray(source));

      expect(await q.findLast((elem, idx) => elem + idx === 0)).to.be.undefined;
    });

    it('Should return first element', async () => {
      const source = [3, 4, 5, 5];
      const q = queryAsync(fromArray(source)).take(10);

      expect(await q.findLast(x => x === 3)).to.be.equal(3);
    });
  });

  describe('When calling average', () => {
    it('Should return 33', async () => {
      const source = [66, 0, 33];
      const q = queryAsync(fromArray(source));

      expect(await q.average()).to.be.equal(33);
    });

    it('Should return undefined', async () => {
      const source = [];
      const q = queryAsync(fromArray(source));

      expect(await q.average()).to.be.undefined;
    });

    it('Should return 10', async () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: 0, tag: 'c' },
      ];
      const q = queryAsync(fromArray(source));

      expect(await q.average(x => x.val)).to.be.equal(10);
    });
  });

  describe('When calling min', () => {
    it('Should return -1', async () => {
      const source = [-1, 3, 4, 33, -1, 4];
      const q = queryAsync(fromArray(source));

      expect(await q.min()).to.be.equal(-1);
    });

    it('Should return undefined', async () => {
      const source = [];
      const q = queryAsync(fromArray(source));

      expect(await q.min()).to.be.undefined;
    });

    it('Should return first element', async () => {
      const source = [
        { val: -10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: 0, tag: 'c' },
      ];
      const q = queryAsync(fromArray(source));

      expect(await q.min((e1, e2) => e1.val - e2.val)).to.be.equal(source[0]);
    });
  });

  describe('When calling max', () => {
    it('Should return 30', async () => {
      const source = [-1, 3, 4, 30, 2, 4];
      const q = queryAsync(fromArray(source));

      expect(await q.max()).to.be.equal(30);
    });

    it('Should return undefined', async () => {
      const source = [];
      const q = queryAsync(fromArray(source));

      expect(await q.max()).to.be.undefined;
    });

    it('Should return first element', async () => {
      const source = [
        { val: 1010, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: 0, tag: 'c' },
      ];
      const q = queryAsync(fromArray(source));

      expect(await q.max((e1, e2) => e1.val - e2.val)).to.be.equal(source[0]);
    });
  });

  describe('When calling sum', () => {
    it('Should return 30', async () => {
      const source = [0, -4, 4, 30, 10, -10];
      const q = queryAsync(fromArray(source));

      expect(await q.sum()).to.be.equal(30);
    });

    it('Should return undefined', async () => {
      const source = [];
      const q = queryAsync(fromArray(source));

      expect(await q.sum()).to.be.undefined;
    });
  });

  describe('When calling reduce', () => {
    it('Should return 0', async () => {
      const source = [0, -4, 4, 30, 10, -10];
      const q = queryAsync(fromArray(source));

      expect(await q.reduce(() => 0, 0)).to.be.equal(0);
    });

    it('Should throw exception', async () => {
      const source = [];
      const q = queryAsync(fromArray(source));

      expect(q.reduce(() => 0)).to.eventually.be.rejected;
    });

    it('Should return 20', async () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = queryAsync(fromArray(source));

      expect(await q.reduce((x, e, idx) => x + e.val, 0)).to.be.equal(20);
    });

    it('Should return abc', async () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = queryAsync(fromArray(source));

      expect(await q.reduce((x, e, idx) => x + e.tag, '')).to.be.equal('abc');
    });
  });

  describe('When calling forEach', () => {
    it('Should return 4 transfromed elements', async () => {
      const source = numberGenerator();
      const result = [];
      await queryAsync(source).take(4).forEach((elem, idx) => result.push(elem + 10));

      expect(result).to.be.deep.equal([10, 11, 12, 13]);
    });

    it('Should return 3 transformed elements', async () => {
      const q = queryAsync(numberGenerator(10, 10));
      const result = [];
      await q.take(3).forEach((elem, idx) => result.push(elem + idx));

      expect(result).to.be.deep.equal([
        10, 21, 32,
      ]);
    });
  });

  describe('When calling awaitAll', () => {
    it('Should return an Iterable', async () => {
      const q = queryAsync(fromArray([1, 2, 3, 2, 1]));
      const q1 = await q.awaitAll();
      const it = q1[Symbol.iterator]();

      expect(it).has.property('next');

      expect(it.next()).to.has.property('value').that.is.equal(1);
      expect(it.next()).to.has.property('value').that.is.equal(2);
      expect(it.next()).to.has.property('value').that.is.equal(3);
      expect(it.next()).to.has.property('value').that.is.equal(2);
      expect(it.next()).to.has.property('value').that.is.equal(1);
      expect(it.next()).to.has.property('done').that.is.true;
    });
  });
});
