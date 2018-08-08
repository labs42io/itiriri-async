import { expect } from 'chai';
import { first } from '../../lib/reducers/first';
import { fromArray } from '../helpers/asyncGenerators';
import { forEach } from '../../lib/reducers/forEach';

describe('reducers/forEach', () => {
  describe('When calling on some array', () => {
    it('Should return 4 transfromed elements', async () => {
      const source = [4, 5, 3, 2];
      const result = [];
      await forEach(fromArray(source), (element, index) => result.push(element * 10 + 1));

      expect(result).to.be.deep.equal([41, 51, 31, 21]);
    });

    it('Should return 3 transfromed elements', async () => {
      const source = [5, 3, 2];
      const result = [];
      await forEach(fromArray(source), (element, index) => result.push(element + index));

      expect(result).to.be.deep.equal([5, 4, 4]);
    });
  });
});
