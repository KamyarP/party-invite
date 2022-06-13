import { LocationDetails } from '../../models/LocationDetails';
import { FileCustomerReadRepository } from '../FileCustomerReadRepository';
import { GreatCircleDistance } from '../GreatCircleDistance';
import { Application } from './Application';

export class Di {
  public static init(filePath: string, sourceLocation: LocationDetails): Application {
    const greatCircleDistance = new GreatCircleDistance(sourceLocation);
    const customerReadRepository = new FileCustomerReadRepository(filePath);
    return new Application(customerReadRepository, greatCircleDistance);
  }
}
