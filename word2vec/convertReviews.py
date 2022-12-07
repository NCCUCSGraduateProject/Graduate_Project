import pymongo

remoteUrl = "mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/?retryWrites=true&w=majority"
localUrl = "mongodb://localhost:27017"
myclient = pymongo.MongoClient(localUrl)
mydb = myclient["placeAPI"]
mycol = mydb["testTemp"]

count = 0
for doc in mycol.find():
    tmpString = ""
    for review in doc["reviews"]:
        tmpString += review + " "

    tmpString.replace("\r\n", " ")
    tmpString.replace("\n", " ")
    ' '.join(tmpString.split())
    tmpString = repr(tmpString).replace('\\r\\n', ' ').replace('\\n', ' ').replace('\\', '')
    tmpString = tmpString[1:-1]
    print(tmpString)
    count += 1
    # update reviews to tempString
    mycol.update_one({"_id": doc["_id"]}, {"$set": {"reviews": tmpString}})

# close connection
myclient.close()
print(count)