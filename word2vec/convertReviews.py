import pymongo

remoteUrl = "mongodb://localhost:57017"
localUrl = "mongodb://localhost:27017"
myclient = pymongo.MongoClient(remoteUrl)
mydb = myclient["gp"]
mycol = mydb["map"] # testTemp has already been converted

print('connect mongo\n')

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
    # print(tmpString)
    count += 1
    # update reviews to tempString
    mycol.update_one({"_id": doc["_id"]}, {"$set": {"reviews": tmpString}})
    print(count,end='\r')

# close connection
myclient.close()
