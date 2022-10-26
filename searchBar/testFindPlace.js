var MongoClient = require('mongodb').MongoClient;

// Connect to the db
const localUrl  = 'mongodb://localhost:27017';
const remoteUrl = 'mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(localUrl, async function(err, client){
 
  try{
    if(err) throw err;

    const db = client.db('placeAPI');
    const query = { "place_id": "ChIJi9a4HS4AaDQR6ZmHtcK5oOk"};
    const options = {};
    
    const document = await db.collection('sphere2dAll').findOne(query, options);
    console.log(document);

  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }

});