const computeSimilarity = require( 'compute-cosine-similarity' );
const Annoy = require('annoy');
const fs = require('fs');

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
  let pathObject = new Array(Math.floor(encodedPath.length / 2));
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
      pathObject[pointIndex] = { lat: lat * 1e-5, lng: lng * 1e-5 }
  }
  path.length = pointIndex;
  pathObject.length = pointIndex;
  return {
    path: path,
    pathObject: pathObject
  };
}

function documentSimilarity(query_vectors, reviews_spacy ,place_id) {
/*
  let max_similarity = 0 

  let tree = new Annoy(300, 'angular')

  let path = './../../AnnTrees/' + place_id + '.ann'
  // check path exists
  if(fs.existsSync(path)) {
    tree.load(path)
  } else {
    return 0 // return 0(the lowest similarity score) if no reviews
  }

  // deal with the case if tree is empty
  if(tree.getNItems() < 1) 
    return 0

  for(let i =0; i < query_vectors.length; i++) {
    let result = tree.getNNsByVector(query_vectors[i], 1, 1, false)
    let similarity = computeSimilarity(query_vectors[i], reviews_spacy[result[0]])
    // console.log(similarity)
    if(similarity > max_similarity) {
      max_similarity = similarity
    }
  }

  return max_similarity + 1
*/
  
  let max_similarity = 0
    for(var i = 0; i < query_vectors.length; i++) {
        for(var j = 0; j < reviews_spacy.length; j++) {
            let temp_similarity = computeSimilarity(query_vectors[i], reviews_spacy[j])
            if(temp_similarity > max_similarity){
                max_similarity = temp_similarity
            } else if(max_similarity >= 0.99 && temp_similarity + 1 > max_similarity) {
                max_similarity = temp_similarity + 1
            }
        }
    }
    return max_similarity
  
}

module.exports ={
  distance:distance,
  decodePath: decodePath,
  documentSimilarity: documentSimilarity
}