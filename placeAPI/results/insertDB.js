var MongoClient = require('mongodb').MongoClient;
const jsonData= require('./most_recently_merged_file.json'); 
console.log(jsonData.length);
console.log(jsonData[0])
// Connect to the db
localUrl = 'mongodb://localhost:27017';
remoteUrl = 'mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(localUrl,function(err, client){
 
    if(err) throw err;
 
    const db = client.db('placeAPI');
 
    objs = jsonData;

    db.collection('TaipeiLeft').insertMany(objs, (err)=>{
        if(err) 
            console.log(err)
        else
            console.log('insertion succeses')
        client.close()
    }) 

});