function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}
function decodePath(encodedPath) {
  let len = encodedPath.length || 0;
  let path = new Array(Math.floor(encodedPath.length / 2));
  let index = 0;
  let lat = 0;
  let lng = 0;
  let pointIndex;
  for (pointIndex = 0; index < len; ++pointIndex) {
      let result = 1;
      let shift = 0;
      let b;
      do {
          b = encodedPath.charCodeAt(index++) - 63 - 1;
          result += b << shift;
          shift += 5;
      } while (b >= 0x1f);
      lat += result & 1 ? ~(result >> 1) : result >> 1;
      result = 1;
      shift = 0;
      do {
          b = encodedPath.charCodeAt(index++) - 63 - 1;
          result += b << shift;
          shift += 5;
      } while (b >= 0x1f);
      lng += result & 1 ? ~(result >> 1) : result >> 1;
      path[pointIndex] = [ lng * 1e-5, lat * 1e-5  ];
  }
  path.length = pointIndex;
  return path;
}

module.exports ={
  distance:distance,
  decodePath: decodePath
}