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
# resultList = placesQuery.getLocation(25.01491,121.53422,radius)

# save the results into files

a, b, c, d = 24.98, 121.562202, 24.94, 121.65

resultList = placesQuery.honeycombSearch(a,b,c,d,200, 'restaurant')
# resultList = placesQuery.honeycombSearch(a,b,c,d,500, 'amusement_park')
# resultList.extend(placesQuery.honeycombSearch(a,b,c,d,500, 'tourist_attraction'))

location = str(a) + '_' + str(b) + '_' + str(c) + '_' + str(d) 

with open(os.path.join('results', location + 'restaurant.json'), 'w') as f:
    f.write(json.dumps(resultList))


# print the names and ratings of the places got from query

counter = 0
print(len(resultList))
for i in resultList:
    print(i["name"])
    counter += 1
print(counter)
