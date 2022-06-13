import * as dotenv from 'dotenv';
dotenv.config();

import * as path from 'path';
import Log from './Common/Log';
import { Di } from './infrasreucture/di/index';
const { LOCATION_LAT, LOCATION_LONG } = process.env;

const main = async () => {
  const app = Di.init(path.resolve(__dirname, '../data/customers.txt'), {
    lat: Number(LOCATION_LAT),
    long: Number(LOCATION_LONG),
  });
  const customers = await app.customerReadRepository.getAllCustomersLocations();
  // calculate distance for each customer and add it to a map with customer id as key
  const distances = new Map<string, number>();
  for (const customer of customers) {
    const distance = app.greatCircleDistance.calculateDistance(customer);
    distances.set(customer.id, distance);
  }

  // filter map based on customers with distance less than 100km
  const filteredCustomers = Array.from(distances.entries())
    .filter(([, distance]) => distance < 100)
    .map(([id, distance]) => ({ id, distance }));

  Log.info('customers with distance less than 100km:');
  Log.info(filteredCustomers);
};

main()
  .catch((err) => Log.error(err))
  .finally(() => Log.info('done'));
