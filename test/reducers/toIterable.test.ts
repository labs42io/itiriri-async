import { expect } from 'chai';
import { empty } from '../helpers/asyncGenerators';
import { toIterable } from '../../lib/reducers/toIterable';

describe('reducers/toIterable', () => {
  describe('When accessing the iterator', () => {
    it('Should return an Iterator', async () => {
      const iterator = await toIterable(empty());

      expect(iterator[Symbol.iterator]()).to.have.property('next');
    });
  });
});
