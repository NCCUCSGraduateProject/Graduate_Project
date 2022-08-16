import mongo from 'mongodb';
var MongoClient = mongo.MongoClient;
import Geohash from 'latlon-geohash';

var allData

// Connect to the db
MongoClient.connect("mongodb://localhost:27017",function(err, client){
 
    if(err) throw err;
 
    const db = client.db('placeAPI');

    db.collection('AllTaipei').find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result.length);
        
        // add new attribute to each document
        result.forEach(element => {
            var geohash = Geohash.encode(element.geometry.location.lat, element.geometry.location.lng, 11); 
            element.geometry.geohash = geohash;
        });
        console.log(result[3]);
        allData = result;

        MongoClient.connect("mongodb://mark:gpteam@yj-serverhome.ddns.net:27017/map",function(err, client){
 
            if(err) 
                throw err;
            else 
                console.log("Connected")

            const db = client.db('map');

            db.collection('all').insertMany(allData, (err)=>{
                if(err) 
                    console.log(err)
                else
                    console.log('insertion succeses')
            })
  
        });


        client.close();
    })

});


