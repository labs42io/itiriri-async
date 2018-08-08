import { expect } from 'chai';
import { empty } from '../helpers/asyncGenerators';
import { awaitAll } from '../../lib/reducers/awaitAll';

describe('reducers/awaitAll', () => {
  describe('When accessing the iterator', () => {
    it('Should return an Iterator', async () => {
      const iterator = await awaitAll(empty());

      expect(iterator[Symbol.iterator]()).to.have.property('next');
    });
  });
});
