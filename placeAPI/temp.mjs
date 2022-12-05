import mongo from 'mongodb';
var MongoClient = mongo.MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017",function(err, client){
 
    if(err) throw err;
 
    const db = client.db('placeAPI');

    db.collection('sphere2dAll').find({}).toArray(function(err, result) {
        if (err) throw err;
        
        for(var i = 0; i < result.length; i++){
            console.log(result[i].types)
        }
        client.close();
    })

});


