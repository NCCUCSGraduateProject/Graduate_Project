import requests
import json
import time
import constant

# parameters: 
#   radius: int, default = "200"
#   lat: int, no default
#   lon: int, no default
#
# returns a list of informations about each restautant in Json format

def getLocation(lat, lon, radius = 200):
    
    location = str(lat) + ',' + str(lon) 

    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+location+"&radius="+str(radius)+"&type=restaurant&key="+constant.API_KEY

    payload={}
    headers = {}

    # the first query
    response = requests.request("GET", url, headers=headers, data=payload)

    # print(response.text)

    responseJSON = json.loads(response.text)
    resultList = responseJSON["results"]

    # Maximum number of pages ( prevent from infinite while loop )
    queryCount, MAX_QUERY_LENGTH = 2, 10

    # the while loop below continously queries the rest data of the request
    # query at most 10 times
    # at most 20 places in a single query
    # next page token is a token that stores the next 20 places if they exist

    while queryCount < MAX_QUERY_LENGTH and "next_page_token" in responseJSON.keys():

        # get next page of the result

        time.sleep(2) 
        pagetoken = responseJSON["next_page_token"]
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken="+pagetoken+"&key="+constant.API_KEY
        response = requests.request("GET", url, headers=headers, data=payload)
        responseJSON = json.loads(response.text) 
        resultList.extend(responseJSON["results"])
        print("the", queryCount, "th query")

        # warn if error happens

        if responseJSON["status"] == "INVALID_REQUEST": 
            print("INVALID_REQUEST")
            break
        else:
            print("success")

        queryCount += 1

    return  resultList

if __name__ == "__main__":
    lat, lon = 24.9870522,121.575362
    a,b = getLocation(lat,lon,70)
    print(a)