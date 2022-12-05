# example of using getLocation()

import placesQuery
import os
import json

# radius = 150

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

a, b, c, d = 25.163, 121.346, 24.9, 121.44

resultList = placesQuery.honeycombSearch(a,b,c,d,150, 'restaurant')
# resultList = []
# resultList.extend(placesQuery.honeycombSearch(a,b,c,d,1000, 'amusement_park'))
# resultList.extend(placesQuery.honeycombSearch(a,b,c,d,1000, 'tourist_attraction'))

'''
x,y = 22.045750, 121.545702
radius = 8000
resultList.extend(placesQuery.getLocation(x, y,radius,'amusement_park'))
resultList.extend(placesQuery.getLocation(x, y,radius,'tourist_attraction'))
'''
location = str(a) + '_' + str(b) + '_' + str(c) + '_' + str(d) 

with open(os.path.join('results', 'TpRestaurant' + location + '.json'), 'w') as f:
    f.write(json.dumps(resultList))


# print the names and ratings of the places got from query

counter = 0
print(len(resultList))
for i in resultList:
    print(i["name"])
    counter += 1
print(counter)
