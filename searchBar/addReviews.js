var MongoClient = require('mongodb').MongoClient;

var axios = require('axios');
var API_KEY = require('./constant.js');

// Connect to the db
const localUrl  = 'mongodb://localhost:27017';
const remoteUrl = 'mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/?retryWrites=true&w=majority';

const getDetails = async (place_id) => {

    var config = {
      method: 'get',
      url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&fields=address_component%2Cadr_address%2Cbusiness_status%2Cformatted_address%2Cgeometry%2Cicon%2Cicon_mask_base_uri%2Cicon_background_color%2Cname%2Cphoto%2Cplace_id%2Cplus_code%2Ctype%2Curl%2Cutc_offset%2Cvicinity%2Cuser_ratings_total%2Crating%2Ceditorial_summary%2Cprice_level%2Creviews&language=zh-TW&key=' + API_KEY,
      headers: { }
    };

    let response = await axios(config);
    let reviews = response.data.result.reviews;
    
    if(reviews) {
        return reviews.map((review) => {
        return review.text;
        });
    }else{
        return []
    }
  
}

MongoClient.connect(localUrl, async function(err, client){
 
  try{
    if(err) throw err;

    // find all places between (24.992, 121.565) and (24.985, 121.579)
    const db = client.db('placeAPI');
    let query = { "geometry.coordinates.1": { $gt: 24.985, $lt: 24.992 }, "geometry.coordinates.0": { $gt: 121.565, $lt: 121.579 } };
    db.collection('test').find(query).forEach(async (document) => {

        console.log(document)

        let place_id = document.place_id;
        let details = await getDetails(place_id);
        // console.log(details);
        /*

        query = { "place_id" : place_id };
        let updateData = { $set: { "reviews" : details } };
        
        const result = await db.collection('test').updateOne(query, updateData);
        console.log(result);*/
    });

  } catch (err) {
    console.log(err);
  } finally {
    // client.close();
  }

});








