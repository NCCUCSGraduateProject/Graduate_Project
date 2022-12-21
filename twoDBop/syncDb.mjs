import mongo from 'mongodb';
var MongoClient = mongo.MongoClient;

var remoteUrl = 'mongodb://localhost:57017'
var localUrl = "mongodb://localhost:27017";

// Connect to the db
console.log('start')

MongoClient.connect(localUrl,function(err, client){

    if(err) throw err;
    console.log('local connected')
 
    const db = client.db('placeAPI');

    db.collection('test4').find({}).toArray(function(err, docs) {
        if (err) throw err;
        
        MongoClient.connect(remoteUrl,function(err, client){

            if(err) 
                throw err;
            else 
                console.log("remote Connected")

            const db = client.db('gp');

            db.collection('map').insertMany(docsToInsert, (err)=>{
                if(err) 
                    console.log(err)
                else
                    console.log('insertion succeses')
            })

  
        });


        client.close();
    })

});
