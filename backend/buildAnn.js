const MongoClient = require('mongodb').MongoClient;
const Annoy = require('annoy');
const fs = require('fs');


// read place_if from placeIDs.txt
fs.readFile('placeIDs.txt', 'utf8', async (err, data) => {
    if (err) {  
        console.error(err);
        return;
    }
    const placeIDs = data.split('\n');

    const client = await MongoClient.connect("mongodb://localhost:27017")
    console.log("Connected successfully to mongo server")
    const db = client.db("gp")
    const collection = db.collection("map")

    for(let i = 0; i < placeIDs.length; i++) {
        const document = await collection.findOne({place_id: placeIDs[i]})

        let tree = new Annoy(300, 'angular')
        
        if(document.reviews_spacy && document.reviews_spacy.length > 0){
            let reviews_spacy = document.reviews_spacy
            for(let j = 0; j < reviews_spacy.length; j++) {
                tree.addItem(j, reviews_spacy[j])
            }
            tree.build()

            let path = './AnnTrees/' + placeIDs[i] + '.ann'
            tree.save(path)
        }
        if(i % 100 === 0) 
            console.log(i)
        
        
    }
    
});

