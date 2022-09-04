import mongo from 'mongodb';
var MongoClient = mongo.MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017",function(err, client){
 
    if(err) throw err;
 
    const db = client.db('placeAPI');

    db.collection('sphere2dAll').find({}).toArray(function(err, result) {
        if (err) throw err;
        
  
        var url = 'mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/?retryWrites=true&w=majority'
        
        MongoClient.connect(url,function(err, client){

            if(err) 
                throw err;
            else 
                console.log("Connected")

            const db = client.db('gp');

            db.collection('map').insertMany(result, (err)=>{
                if(err) 
                    console.log(err)
                else
                    console.log('insertion succeses')
            })

            client.close();
  
        });


        client.close();
    })

});


