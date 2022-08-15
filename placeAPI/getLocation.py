# example of using getLocation()

import placesQuery
import os
import json

radius = 3000

# function getlocation: 
# parameters: 
#   lat: int, no default
#   lon: int, no default
#   radius: int, default = "200"
#
# returns  a list of informations about each restautant in Json format

# test 1
x, y = 23.208144, 119.430012

# resultList = placesQuery.getLocation(x, y,radius,'amusement_park')
# print(len(resultList))

# resultList.extend(placesQuery.getLocation(x,y,radius,'tourist_attraction'))
# print(len(resultList))

resultList = placesQuery.getLocation(x, y,radius,'restaurant')


# print(json.dumps(resultList),'\n\n\n')



for i in resultList:
    print(i['name'])
    print(i['types'])

with open(os.path.join('results/penghu', 'qimeiFood.json'), 'w') as f:
    f.write(json.dumps(resultList))
