import { Di } from '../src/infrasreucture/di';

test('should calculate distance correctly', () => {
  const sourceLocation = { lat: 52.493256, long: 13.446082 };
  const app = Di.init('', sourceLocation);
  const destinationLocation = { lat: 50.43483821, long: 11.96975958 };
  const distance = app.greatCircleDistance.calculateDistance(destinationLocation);
  const expected: number = 250.68197702140284;
  expect(distance).toBe(expected);
});
