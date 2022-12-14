var MongoClient = require('mongodb').MongoClient;
 
const main = async () => {
    const client = await MongoClient.connect("mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/myFirstDatabase?authMechanism=DEFAULT", { useUnifiedTopology: true })
    const db = await client.db("gp")
    const collection = await db.collection("map")
    const result = await collection.find({}).toArray()

    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, 'review_js.json');

    for(let i = 0; i < result.length; i++){
        const obj = result[i];
        const reviews = obj.reviews;
        let tmpString = "";
        for(let j = 0; j < reviews.length; j++){
            const review = reviews[j];
            tmpString += review + " "
        }
        tmpString = tmpString.replace(/\n/g,' ');
        collection.updateOne({_id: obj._id}, {$set: {concated_review: tmpString}})
        // fs.writeFile(filePath, (obj.place_id + " " + tmpString));
        console.log(obj.place_id + " finished!");
    }
}

main().catch(console.error);