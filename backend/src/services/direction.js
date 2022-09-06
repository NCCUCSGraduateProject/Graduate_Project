const {Client} = require("@googlemaps/google-maps-services-js");
const client = new Client({})
const key = require("../configs/api_key.json").API_KEY

var {MongoClient, MongoError} = require("mongodb");
const {distance, decodePath} = require("../utils/util.js")

const url = 'mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/?retryWrites=true&w=majority';

const nearbyPoints = async (originLat, originLng, destLat, destLng, limitDistance) => {
  const mongoClient = await MongoClient.connect(url)
  
  console.log(originLat, originLng, destLat, destLng, limitDistance)

  try{
    var originLatLng = {latitude: originLat, longitude: originLng}
    var destLatLng = {latitude: destLat, longitude: destLng}
    const params = {
      origin: originLatLng,
      destination: destLatLng,
      travelMode: 'DRIVING',
      key: key
    };

    let response = await client.directions({params:params})
    // console.log(response.data)
    let steps = response.data.routes[0].legs[0].steps
    let pathArr = []
    for(var i = 0; i < steps.length; ++i){
      pathArr.push(decodePath(steps[i].polyline.points))
    }
    pathArr = pathArr.flat()
    //console.log(pathArr[0][0])
    // let summerize = {}

    // init summerize
    // for(var i = 10; i < 201; i += 10){
    //   summerize[i] = 0
    // }
    // summerize.total = 0

    // for(var i = 0;  i < pathArr.length; ++i){
    //   for(var j = 1; j < pathArr[i].length; ++j){
    //     let dis = distance(pathArr[i][j-1].lat, pathArr[i][j-1].lng, pathArr[i][j].lat, pathArr[i][j].lng, 'K')
    //     for(var k = 10; k < 201; k += 10){
    //       if(dis <= k/1000){
    //         summerize[k] += 1
    //         break
    //       }
    //     }
    //     summerize.total += 1
    //   }
    // }

    const database = mongoClient.db("map");
    const gatewayInfos = database.collection("all");
    
    const options = {
      projection: { _id:1, "geometry.location": 1, place_id:1},
    }
    
    let resultMap = new Map()
    
    for(var i = pathArr.length-1; i >=0; i-=10 ){
      console.log(pathArr[i])
      const query = {geometry: {$geoWithin: {$centerSphere: [[pathArr[i].lng,pathArr[i].lat], ((1000*limitDistance)/3963.2)/1609 ] } } }
      const documents = await gatewayInfos.find(query, options).toArray();
      
      for(var j = 0; j < documents.length; j++){
        resultMap.set(documents[j].place_id, documents[j])
      }
      
    }

    let result = {
      nearby: Array.from(resultMap.values()),
      path: pathArr
    }
    return result
  }
  catch(error){
    console.log(error)
  }
  finally{
    await mongoClient.close();
  }


}

module.exports = {
  nearbyPoints:nearbyPoints
}