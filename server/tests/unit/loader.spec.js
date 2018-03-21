import { expect } from 'chai';
import { batchingFunction } from '../../graphql/loaders';
import User from '../../models/user'

describe('Batching function (fail case)', () => {
  const keys = [1, 2, 4, 8, 6, "5aaf7f6c9cbf9b677c2150f9"];
  it('should return an array of length 6', async () => {
    const results = await batchingFunction(keys, User);
    expect(results).to.be.an('array');
    expect(results.length).to.be.equal(6);
    expect(results[5]).to.be.an('object');
    expect(results[5].username).to.equal("hasstrupezekiel");
    expect(results[0]).to.be.equal(null);
  });
});
