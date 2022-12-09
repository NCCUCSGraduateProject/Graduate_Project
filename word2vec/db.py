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
i = 1

# clone collection from local to remote
for doc in localCol.find({}):
    
    if i % 50 == 0:
        print(i)
    i += 1
    if i <= 30981:
        continue
    if i >= 47300:
        break
    
    # print(doc)
    remoteCol.insert_one(doc)

print('end')
remoteClient.close()
localClient.close()
