var MongoClient = require('mongodb').MongoClient;

// Connect to the db
const localUrl  = 'mongodb://localhost:27017';
const remoteUrl = 'mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(localUrl, async function(err, client){
 
    if(err) throw err;
    const db = client.db('placeAPI');

    let allData = [];

       // find all places between (24.992, 121.565) and (24.985, 121.579)
    db.collection('test').find({}).forEach(async (document) => {
       allData.push(document)
    }).then(function(){
        const unique = [...new Map(allData.map(item => [item['place_id'], item])).values()]
        console.log(unique)
        console.log(allData.length)
        db.collection('map').insertMany(unique, function(err, res) {
            if (err) throw err;
        }).then(function(){
            console.log('finish')
        });
    })


});
