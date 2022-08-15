import Geohash from 'latlon-geohash';
const geohash = Geohash.encode(52.123999, 0.123999, 11);
console.log(geohash);
const latlon = Geohash.decode('u120dbfk33s');
console.log(JSON.stringify(latlon));