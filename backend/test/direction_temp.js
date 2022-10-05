// google client
const {Client} = require("@googlemaps/google-maps-services-js");
const client = new Client({})
const key = require("../configs/api_key.json").API_KEY

// mongo client
var {MongoClient, MongoError} = require("mongodb");
const {distance, decodePath} = require("../utils/util.js")

//import jsts
// const import_jsts = require("../utils/jsts.js")
// var {GeoJSONReader, GeoJSONWriter, BufferOp} = import_jsts

const url = 'mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/?retryWrites=true&w=majority';

const nearbyPoints = async (originLat, originLng, destLat, destLng, limitDistance) => {
  const mongoClient = await MongoClient.connect(url)
  
  console.log(originLat, originLng, destLat, destLng, limitDistance)

  try{
    
    // ======== google map =======
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
    

    // ========= jsts ===========
    const {default: GeoJSONReader}  = await import('jsts/org/locationtech/jts/io/GeoJSONReader.js')
    const {default: GeoJSONWriter}  = await import('jsts/org/locationtech/jts/io/GeoJSONWriter.js')
    const { BufferOp } = await import('jsts/org/locationtech/jts/operation/buffer.js')
    var geoInput = {
      type: "LineString",
      coordinates: pathArr,
    };
    
    var geoReader = new GeoJSONReader()
    var geoWriter = new GeoJSONWriter();
    var geometry = geoReader.read(geoInput)
    var buffer = BufferOp.bufferOp(geometry, 50);
    var polygon = geoWriter.write(buffer);
    // console.log("Input line:")
    // for (var i in geoInput.coordinates) {
    //     console.log(geoInput.coordinates[i]);
    // }
    // console.log("Result:")
    
    console.log(polygon.coordinates)
    
    // =========   mongo query =======

    const database = mongoClient.db("gp");
    const gatewayInfos = database.collection("map");
    
    const options = {
      projection: { _id:1, "geometry": 1, rating:1, user_ratings_total:1,place_id:1},
    }

    const query = {
      loc: {
        $geoWithin: {
           $geometry: {
              type : "Polygon" ,
              coordinates: polygon.coordinates
           }
        }
      }
    }
    const documents = await gatewayInfos.find(query, options).toArray();

    
    
    
    // for(var i = pathArr.length-1; i >=0; i-=10 ){
    //   console.log(pathArr[i])
    //   //((1000*limitDistance)/3963.2)/1609
    //   //const query = {geometry: {$geoWithin: {$centerSphere: [[pathArr[i].lng,pathArr[i].lat],  1] } } }
    //   const query = {geometry: {$geoWithin: {$centerSphere: [[pathArr[i].lng,pathArr[i].lat],  ((1000*limitDistance)/3963.2)/1609] } } }
    //   const documents = await gatewayInfos.find(query, options).toArray();
    //   console.log(documents)
    //   for(var j = 0; j < documents.length; j++){
    //     resultMap.set(documents[j].place_id, documents[j])
    //   }
      
    // }
    // console.log(resultMap)
    let result = {
      nearby: documents,
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