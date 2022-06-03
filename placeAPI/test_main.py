import placesQuery
import os
import json

radius = 250
restaurantNames, resultList = placesQuery.getLocation(24.9870522,121.575362,radius)

with open(os.path.join('results/name',str(radius)+'.txt'), 'w') as f:
    for item in restaurantNames:
        f.write("%s\n" % item)

        
with open(os.path.join('results',str(radius)+'.json'), 'w') as f:
    f.write(json.dumps(resultList))