from pymongo import MongoClient

url = "mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/myFirstDatabase?authMechanism=DEFAULT"
client = MongoClient(url)

db = client["gp"]
collection = db["map"]

# get all the reviews
store = collection.find({"reviews": {"$exists": True}})

# store reviews in a file
count = 0
with open("reviews.txt", "w") as f:
    tmpString = ""
    for s in store:
        for review in s["reviews"]:
            tmpString += review + " "
        
        tmpString.replace("\r\n", " ")
        tmpString.replace("\n", " ")
        ' '.join(tmpString.split())
        tmpString = repr(tmpString).replace('\\r\\n', ' ').replace('\\n', ' ').replace('\\', '')
        tmpString = tmpString[1:-1]

        f.write(s["place_id"] + "," + tmpString + "\n")
        count += 1
        # print(count, " ", s["place_id"])
        # if count > 0:
        #     break