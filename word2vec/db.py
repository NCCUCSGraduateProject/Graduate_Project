import pymongo

localUrl = 'mongodb://localhost:27017'
remoteUrl = 'mongodb://localhost:57017'

remoteClient = pymongo.MongoClient(remoteUrl)
remoteDb = remoteClient["gp"]
remoteCol = remoteDb["map"]

localClient = pymongo.MongoClient(localUrl)
localDb = localClient["placeAPI"]
localCol = localDb["backupAll"]

print('connect mongo\n')

count = 0
i = 0


# clone collection from local to remote
for doc in remoteCol.find({}):

    count += len(doc['tags'])
    i += 1
    print(i)

    # remoteCol.insert_one(doc)

print('end')
print(count)

remoteClient.close()
localClient.close()
