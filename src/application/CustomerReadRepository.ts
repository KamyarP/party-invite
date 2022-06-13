import { CustomerLocation } from '../models/CutomerLocation';

export interface CustomerReadRepository {
  getAllCustomersLocations(): Promise<CustomerLocation[]>;
}
