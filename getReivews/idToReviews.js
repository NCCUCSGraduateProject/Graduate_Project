const fs = require('fs');
const axios = require('axios');
const API_KEY = require('./constant.js');
const MongoClient = require('mongodb').MongoClient;

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
    // console.log(response.data);

    if(response.data.result == undefined) {
        console.log("invalid place_id !");
        return [];
    }else if(response.data.result.reviews != undefined) {
        return response.data.result.reviews.map((review) => {
            return review.text;
        });
    }else{
        return []
    }

    /*
    let reviews = response.data.result.reviews ? response.data.result.reviews.map((review) => {
        return review.text
    }) : [];
    return reviews;
    
    // return [] if no reivews, 
    return reviews ? reviews.map((review) => {
        return review.text;
    }): [];
    */

  
}

fs.readFile('placeIDs.txt', 'utf8', async (err, data) => {
    if (err) {  
        console.error(err);
        return;
    }
    const placeIDs = data.split('\n');
    // console.log(placeIDs.length);

    const client = await MongoClient.connect(remoteUrl)

    if(err) throw err;
            console.log('connected to db');

    const db = client.db('gp');
    // 58117
    for(let i = 56549; i < 58117; i++) {

        let reviews = await getDetails(placeIDs[i]);
        let query = { "place_id" : placeIDs[i] };
        let updateData = { $set: { "reviews" : reviews } };

        // print name and reviews
        // console.log(document.name);
    
        const result = await db.collection('map').updateOne(query, updateData);
        // console.log(result);
        console.log(i)
     
    }
    client.close();
    /*
    for(let i = 0; i < 10; i++){
        let review = await getDetails(placeIDs[i])
        console.log(i, review);
    }
    */
    
});
