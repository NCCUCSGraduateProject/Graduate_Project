var MongoClient = require('mongodb').MongoClient;
// Connect to the db
MongoClient.connect("mongodb://mark:gpteam@yj-serverhome.ddns.net:27017/map",function(err, client){
 
    if(err) 
        throw err;
    else 
        console.log("Connected")

    objs = [{ item: "card", qty: 16 },{ item: "card", qty: 17 }];

    const db = client.db('map');

    db.collection('test').insertMany(objs, (err)=>{
        if(err) 
            console.log(err)
        else
            console.log('insertion succeses')
    })

    db.collection('all').find({}).toArray(function(err, result) {
        if (err) 
            throw err;
        console.log(result);
        client.close();
    })

});