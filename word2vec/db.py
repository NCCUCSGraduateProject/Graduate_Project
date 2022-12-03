import pymongo
myclient = pymongo.MongoClient("mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/?retryWrites=true&w=majority")
mydb = myclient["gp"]
mycol = mydb["map"]

print('connect mongo\n')

for doc in mycol.find():
    if "tourist_attraction" in doc["types"] or "amusement_park" in doc["types"]:
        print(doc['reviews'])
    
myclient.close()
