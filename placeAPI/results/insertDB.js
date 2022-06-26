var MongoClient = require('mongodb').MongoClient;
const jsonData= require('./150.json'); 
console.log(jsonData);
// Connect to the db
MongoClient.connect("mongodb://localhost:27017",function(err, client){
 
    if(err) throw err;
 
    const db = client.db('placeAPI');
 
    objs = jsonData;

    db.collection('test066').insertMany(objs, (err)=>{
        if(err) 
            console.log(err)
        else
            console.log('insertion succeses')
        client.close()
    })

});