import { expect } from 'chai';
import { isAsyncIterable } from '../../lib/utils/isAsyncIterable';
import { queryAsync } from '../../lib/QueryAsync';
import { empty, numbers } from '../helpers/asyncGenerators';

describe('utils/isAsyncIterable', () => {
  describe('When called on empty source', async () => {
    it('Should return true', () => {
      expect(isAsyncIterable(empty())).to.be.true;
    });
  });
  describe('When called on non-empty source', () => {
    it('Should return true on empty string', async () => {
      expect(isAsyncIterable(numbers(1, 1))).to.be.true;
    });
  });
  describe('When called on QueryAsync', () => {
    it('Should return true', async () => {
      expect(isAsyncIterable(queryAsync(empty()))).to.be.true;
    });
  });
  describe('When called on Number', () => {
    it('Should return false', async () => {
      expect(isAsyncIterable(4)).to.be.false;
    });
  });
  describe('When called on Object', () => {
    it('Should return false', async () => {
      expect(isAsyncIterable({ a: 1, b: 'a' })).to.be.false;
    });
  });
});
