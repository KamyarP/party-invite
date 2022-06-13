import { readFileSync } from 'fs';
import { CustomerReadRepository } from '../application/CustomerReadRepository';
import Log from '../Common/Log';
import { CustomerLocation } from '../models/CutomerLocation';

export class FileCustomerReadRepository implements CustomerReadRepository {
  constructor(private readonly filePath: string) {}

  async getAllCustomersLocations(): Promise<CustomerLocation[]> {
    const fileContent = readFileSync(this.filePath, 'utf8');
    const rawData = fileContent.split('\n');
    const result: CustomerLocation[] = [];
    for (const line of rawData) {
      const data = this.parseLine(line);
      if (data) result.push(data);
    }

    return result;
  }

  private parseLine(line: string): CustomerLocation | undefined {
    // standard format for uuid is xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (https://stackoverflow.com/a/13653180/337294)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const lineData = line.split(',');
    if (lineData.length < 3) {
      Log.error(`Invalid customer location data: ${line}`);
      return undefined;
    }

    const [customerId, lat, long] = lineData;
    const id = customerId.split(':')[1].trim(); // format: (id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
    // check to see if id is in the standard uuid format
    if (!uuidRegex.test(id)) {
      Log.warn(`Id seems to be invalid: ${id}`);
    }

    // try to parse lat and long as numbers (format: lat: value, long: value)
    const latitude = Number(lat.split(':')[1].trim());
    const longitude = Number(long.split(':')[1].trim());
    if (isNaN(latitude) || isNaN(longitude)) {
      Log.error(`Invalid location data for ${id}: ${lat}, ${long}`);
      return undefined;
    }

    return { id, lat: latitude, long: longitude };
  }
}
