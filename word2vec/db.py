import pymongo

localUrl = 'mongodb://localhost:27017'
oldRemoteUrl = 'mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/?retryWrites=true&w=majority'
newRemoteUrl = 'mongodb://localhost:57017'

myclient = pymongo.MongoClient(newRemoteUrl)
mydb = myclient["gp"]
mycol = mydb["map"]

print('connect mongo\n')

count = 0
i = 0

for doc in mycol.find():
    print(doc)
    # if "tourist_attraction" in doc["types"] or "amusement_park" in doc["types"]:
        # count += 1

myclient.close()
