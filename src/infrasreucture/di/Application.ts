import { GreatCircleDistance } from './../GreatCircleDistance';
import { CustomerReadRepository } from '../../application/CustomerReadRepository';

export class Application {
  constructor(
    public readonly customerReadRepository: CustomerReadRepository,
    public readonly greatCircleDistance: GreatCircleDistance,
  ) {}
}
