const API_KEY = require("../configs/api_key.json").API_KEY
const axios = require('axios')
var {MongoClient, MongoError} = require("mongodb");

const url = 'mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/?retryWrites=true&w=majority';

const predict = async (inputStr) => {

  var config = {
    method: 'get',
    url: encodeURI('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + inputStr.query + '&types=restaurant|amusement_park|tourist_attraction&key=' + API_KEY),
    headers: {}
  };
  
  let response = await axios(config)

  var result = []
  response.data.predictions.forEach((item) => {
      let data = {
          value: item.structured_formatting.main_text,
          address: item.structured_formatting.secondary_text,
          place_id: item.place_id
      }
      result.push(data)
  })

  // the final data we want in the predictions
  return result


}

const detail = async (place_id) => {
  const mongoClient = await MongoClient.connect(url)
  const db = mongoClient.db("gp")
  const collection = db.collection("map")

  const query = {
    place_id: place_id
  }

  let result = await collection.findOne(query)

  let data = {
    name: result.name,
    address: result.vicinity,
    lat: result.geometry.coordinates[1],
    lng: result.geometry.coordinates[0],
    // geometry: result.geometry,
    place_id: result.place_id
  }

  return data
} 

module.exports = {
  predict: predict, 
  detail: detail
}