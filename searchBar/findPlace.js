var MongoClient = require('mongodb').MongoClient;

// Connect to the db
const localUrl  = 'mongodb://localhost:27017';
const remoteUrl = 'mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(remoteUrl, async function(err, client){
 
  try{
    if(err) throw err;

       // find all places between (24.992, 121.565) and (24.985, 121.579)
       const db = client.db('gp');
       let query = { "geometry.coordinates.1": { $gt: 24.985, $lt: 24.993 }, "geometry.coordinates.0": { $gt: 121.573, $lt: 121.579 } };
       db.collection('map').find(query).forEach(async (document) => {
   
        console.log(document);
           
       });

  } catch (err) {
    console.log(err);
  } finally {
    // client.close();
  }

});