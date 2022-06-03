# example of using getLocation()

import placesQuery
import os
import json

radius = 250

# function getlocation: 
# parameters: 
#   lat: int, no default
#   lon: int, no default
#   radius: int, default = "200"
#
# returns a tuple (a,b) 
#   a is a list of restaurant names
#   b is a list of informations about each restautant in Json format
restaurantNames, resultList = placesQuery.getLocation(24.9870522,121.575362,radius)

# save the results into files
with open(os.path.join('results/name',str(radius)+'.txt'), 'w') as f:
    for item in restaurantNames:
        f.write("%s\n" % item)

        
with open(os.path.join('results',str(radius)+'.json'), 'w') as f:
    f.write(json.dumps(resultList))