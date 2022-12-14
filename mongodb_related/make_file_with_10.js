var MongoClient = require('mongodb').MongoClient;
 
const main = async () => {
    const client = await MongoClient.connect("mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/myFirstDatabase?authMechanism=DEFAULT", { useUnifiedTopology: true })
    const db = await client.db("gp")
    const collection = await db.collection("map")
    const result = await collection.find({}).limit(1000).toArray()

    console.log(result);

    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, 'review_js.csv');

    for(let i = 0; i < result.length; i++){
        const obj = result[i];
        const reviews = obj.reviews;
        let tmpString = "";
        for(let j = 0; j < reviews.length; j++){
            if(typeof(reviews) == "string"){
                tmpString = reviews;
                break;
            }else{
                const review = reviews[j];
                tmpString += review + " "
            }
        }
        tmpString = tmpString.replaceAll(","," ");
        tmpString = tmpString.replaceAll(/\n/g,' ');
        tmpString = tmpString.replaceAll(/\s/g, "");
        fs.writeFileSync(filePath, (obj.place_id + ",\"" + tmpString + "\"\n"), {flag: 'a'});
        console.log(obj.place_id + ": " + tmpString + " finished!");
    }

    client.close();
}

main().catch(console.error);