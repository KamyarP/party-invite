import * as path from 'path';
import { Di } from '../src/infrasreucture/di';

test('should parse customers locations correctly', async () => {
  const app = Di.init(path.resolve(__dirname, '../data/customers.txt'), {
    lat: 0,
    long: 0,
  });
  const customers = await app.customerReadRepository.getAllCustomersLocations();
  expect(customers.length).toBe(397);
});
