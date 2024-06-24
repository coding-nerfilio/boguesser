export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const codeToCoords = (code: string) => {
  let long = new Number(code.split("!1d")[1].split("!2d")[0]).valueOf();
  let lan = new Number(code.split("!2d")[1].split("!3f")[0]).valueOf();
  return [lan, long];
};

function toDeg(value: number) {
  return (value * 180) / Math.PI;
}

export function midpoint(c1: Array<number>, c2: Array<number>) {
  let lat1 = c1[0];
  let lon1 = c1[1];

  let lat2 = c2[0];
  let lon2 = c2[1];

  const dLon = toRad(lon2 - lon1);

  // Convert latitudes to radians
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);
  lon1 = toRad(lon1);

  const Bx = Math.cos(lat2) * Math.cos(dLon);
  const By = Math.cos(lat2) * Math.sin(dLon);
  const lat3 = Math.atan2(
    Math.sin(lat1) + Math.sin(lat2),
    Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By)
  );
  const lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);

  return [toDeg(lat3), toDeg(lon3)];
}

export const Haversine = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371; // Radio de la Tierra en kilómetros
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

export const toRad = (Value: number) => {
  return (Value * Math.PI) / 180;
};

export const distanceToZoom = (distance: number) => {
  if (distance < 1) return 1;
  if (distance < 5) return 1;
  if (distance < 10) return 1;
  if (distance < 20) return 1;
  if (distance < 50) return 11;
  if (distance < 100) return 10;
  if (distance < 200) return 9;
  if (distance < 500) return 8;
  if (distance < 1000) return 7;
  if (distance < 2000) return 6;
  if (distance < 5000) return 5;
  if (distance < 10000) return 4;
  return 3;
};
