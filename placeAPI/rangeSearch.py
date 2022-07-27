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

a, b, c, d = 25.09, 121.54,  25.068704,121.615917 

resultList = placesQuery.honeycombSearch(a,b,c,d,120);

location = str(a) + '_' + str(b) + '_' + str(c) + '_' + str(d) 

with open(os.path.join('results', location +'.json'), 'w') as f:
    f.write(json.dumps(resultList))


# print the names and ratings of the places got from query

counter = 0
print(len(resultList))
for i in resultList:
    print(i["name"])
    counter += 1
print(counter)
