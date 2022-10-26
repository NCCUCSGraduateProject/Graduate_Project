var MongoClient = require('mongodb').MongoClient;

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
      console.log('No document found');
    }

  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }

});