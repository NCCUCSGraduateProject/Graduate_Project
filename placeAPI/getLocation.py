# example of using getLocation()

import placesQuery
import os
import json

radius = 150

# function getlocation: 
# parameters: 
#   lat: int, no default
#   lon: int, no default
#   radius: int, default = "200"
#
# returns  a list of informations about each restautant in Json format

# test 1
resultList = placesQuery.getLocation(23.611961, 119.508723,radius,'')

print(json.dumps(resultList),'\n\n\n')



for i in resultList:
    print(i['name'])
    print(i['types'])