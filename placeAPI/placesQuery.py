from unittest import result
import requests
import json
import time
import constant
from math import sqrt

# parameters: 
#   radius: int, default = 100
#   lat: int, no default
#   lon: int, no default
#
# returns a list of informations about each restautant in Json format (dict)

def getLocation(lat, lon, radius = 200):
    
    location = str(lat) + ',' + str(lon) 

    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+location+"&radius="+str(radius)+"&type=restaurant&language=zh-TW&key="+constant.API_KEY

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

# if(lat = 25.012595)
#   100m => 0.000992 lon 
# if (lat = 22)
#   100m => 0.000968 lon 

# 100m => 0.0009 lat

# lat/lon gap for every 1 meter

lonPerMeterAt25 = 0.00000992
lonPerMeterAt22 = 0.00000968
latPerMeter = 0.000009

# parameters: 
#   radius: int, default = 100
#   topLeftLat : the lat of top Left  
#   topLeftLon : the lon of top Left 
#   downRightLat : the lat of down right
#   downRightLon : the lon of down right
#
# returns a list of informations about each restautant in JSON format (dict)

def honeycombSearch(topLeftLat, topLeftLon, downRightLat, downRightLon, radius = 100):

    resultList = [] 

    # Even rows should be shifted left while odd rows does not need to
    shift = 0 

    i = topLeftLat
    while i > downRightLat: 
        
        # j starts from the top left corner [left shift (√3/2)*r at even rows]
        j = topLeftLon - sqrt(3) * radius * 0.5 *(shift%2) * lonPerMeterAt25

        while j < downRightLon:

            print(i,j)
            resultList.extend(getLocation(i, j, radius))

            # j += √3 * r  and convert to lon
            j += sqrt(3) * radius * lonPerMeterAt25 

        shift = (shift+1) % 2
        
        # i -= (3/2) * r and convert to lat
        i -= 1.5 * radius * latPerMeter

    return resultList


