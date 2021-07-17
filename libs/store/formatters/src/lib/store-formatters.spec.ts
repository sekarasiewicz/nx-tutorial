import { formatRating } from './store-formatters';

describe('storeFormatters', () => {
  it('should work', () => {
    expect(formatRating()).toEqual('store-formatters');
  });
});
