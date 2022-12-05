# example of using getLocation()

import placesQuery
import os
import json

radius = 1500

# function getlocation: 
# parameters: 
#   lat: int, no default
#   lon: int, no default
#   radius: int, default = "200"
#
# returns  a list of informations about each restautant in Json format

# test 1
x, y = 25.187223, 121.421247

# resultList = placesQuery.getLocation(x, y,radius,'amusement_park')
# print('amusement_park',len(resultList))

# resultList = []
# resultList.extend(placesQuery.getLocation(x,y,radius,'tourist_attraction'))
# print('tourist attraction',len(resultList))

resultList = placesQuery.getLocation(x, y,radius,'restaurant')


# print(json.dumps(resultList),'\n\n\n')

# resultList.extend(placesQuery.getLocation(x,y,radius,'park'))

for i in resultList:
    print(i['name'])

with open(os.path.join('results', 'single.json'), 'w') as f:
    f.write(json.dumps(resultList))
