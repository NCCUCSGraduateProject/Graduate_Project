var MongoClient = require('mongodb').MongoClient;

// Connect to the db
const local = {
  Url:'mongodb://localhost:27017',
  collection:'sphere2dAll'
}
const remote = {
  Url: 'mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/?retryWrites=true&w=majority',
  collection: 'map'
}

MongoClient.connect(remote.Url, async function(err, client){
 
  try{
    if(err) throw err;

    const db = client.db('placeAPI');
    const query = { "place_id": "ChIJi9a4HS4AaDQR6ZmHtcK5oOk"};
    const options = {};
    
    const document = await db.collection(remote.collection).findOne(query, options);
    console.log(document);

  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }

});