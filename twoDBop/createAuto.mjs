import mongo from 'mongodb';
var MongoClient = mongo.MongoClient;

var url = 'mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/?retryWrites=true&w=majority'
var localUrl = "mongodb://localhost:27017";

// Connect to the db
console.log('start')

const extractDoc = (doc) => {
    const { name, place_id, vicinity} = doc;
    return { 
        name: name, 
        place_id: place_id, 
        vicinity: vicinity
    };
}

MongoClient.connect(url,function(err, client){

    if(err) throw err;
    console.log('remote connected')
 
    const db = client.db('gp');

    db.collection('map').find({}).toArray(function(err, docs) {
        if (err) throw err;
        
        MongoClient.connect(localUrl,function(err, client){

            if(err) 
                throw err;
            else 
                console.log("local Connected")

            const db = client.db('gp');

            const docsToInsert = docs.map(extractDoc);

            db.collection('vicinity').insertMany(docsToInsert, (err)=>{
                if(err) 
                    console.log(err)
                else
                    console.log('insertion succeses')
            })

  
        });


        client.close();
    })

});
