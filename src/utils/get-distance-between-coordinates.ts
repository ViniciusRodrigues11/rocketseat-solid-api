export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export function getDistanceBetweenCoordinates(
  from: ICoordinates,
  to: ICoordinates
) {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0;
  }

  const fromRadian = (Math.PI * from.latitude) / 180;
  const toRadian = (Math.PI * to.latitude) / 180;

  const theta = from.longitude - to.longitude;
  const radTheta = (Math.PI * theta) / 180;

  let distanceInKilometers =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta);

  if (distanceInKilometers > 1) {
    distanceInKilometers = 1;
  }

  distanceInKilometers = Math.acos(distanceInKilometers);
  distanceInKilometers = (distanceInKilometers * 180) / Math.PI;
  distanceInKilometers = distanceInKilometers * 60 * 1.1515;
  distanceInKilometers = distanceInKilometers * 1.609344;

  return distanceInKilometers;
}
