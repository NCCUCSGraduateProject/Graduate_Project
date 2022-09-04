var MongoClient = require('mongodb').MongoClient;
// Connect to the db
remoteUrl = "mongodb://mark:gpteam@yj-serverhome.ddns.net:27017/map";
localUrl = "mongodb://localhost:27017";

MongoClient.connect(localUrl,function(err, client){
 
    if(err) 
        throw err;
    else 
        console.log("Connected")

    const db = client.db('placeAPI');

    db.collection('AllTaipei').find({}).toArray(function(err, result) {

        if (err) 
            throw err;

        result.forEach(element => {
            geometry = {
                type: 'Point',
                coordinates: [element.geometry.location.lng, element.geometry.location.lat]
            }
            element.geometry = geometry;
        })

        // console.log(result[3]); // print a random document


        db.collection('sphere2dAll').insertMany(result,{ordered : false }, (err)=>{
            if(err) 
                console.log(err)
            else
                console.log('insertion succeses')
            client.close()
        })

    })

});