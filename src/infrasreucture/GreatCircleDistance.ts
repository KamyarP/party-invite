import { LocationDetails } from '../models/LocationDetails';

export class GreatCircleDistance {
  private readonly radius = 6371; // Radius of the earth in km

  constructor(private readonly sourceLocation: LocationDetails) {}

  public calculateDistance = (location: LocationDetails): number => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const phiOne = toRad(this.sourceLocation.lat);
    const lambdaOne = toRad(this.sourceLocation.long);
    const phiTwo = toRad(location.lat);
    const lambdaTwo = toRad(location.long);
    const deltaPhi = phiTwo - phiOne;
    const deltalambda = lambdaTwo - lambdaOne;
    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phiOne) * Math.cos(phiTwo) * Math.sin(deltalambda / 2) * Math.sin(deltalambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.radius * c;
  };
}
