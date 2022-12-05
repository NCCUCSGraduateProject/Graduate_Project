const MongoClient = require('mongodb').MongoClient;
const axios = require('axios');
const API_KEY = require('./constant.js');



// Connect to the db
const localUrl  = 'mongodb://localhost:27017';
const remoteUrl = 'mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(remoteUrl, async function(err, client){
 
  try{
    if(err) throw err;


    const db = client.db('gp');
    const query = { "place_id": "ChIJi9a4HS4AaDQR6ZmHtcK5oOk"};
    const options = {};
    
    const document = await db.collection('map').findOne(query, options);
    console.log(document);

    if(!document) {

      console.log('No document found, adding new document');
      const placeDetails = await getPlaceDetails(query.place_id);
      const newDocument = modifyDocument(placeDetails);
      const result = await db.collection('map').insertOne(newDocument);
      console.log(result);

    } else {
      console.log('Document found');
    }

  } catch (err) {
    console.log(err);
  } finally {
    // client.close();
  }

});

const getPlaceDetails = async function(place_id) {

  var config = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&fields=name%2Crating%2Cformatted_phone_number&key=' + API_KEY,
    headers: { }
  };

  let response = await axios(config);
  console.log(response.data)
  return response.data;

}


const modifyDocument = function(document) {

  geometry = {
    type: 'Point',
    coordinates: [document.geometry.location.lng, document.geometry.location.lat]
  }
  document.geometry = geometry;

  return document;
}