import constants

print(constants.API_TOKEN)

import googlemaps
from datetime import datetime

gmaps = googlemaps.Client(key=constants.API_TOKEN)

# Geocoding an address
geocode_result = gmaps.geocode(address='116台北市文山區指南路二段64號', language='zh-TW')
f = open('geocode_result.txt', 'w')
f.write(str(geocode_result))
f.close()
# # Look up an address with reverse geocoding
# reverse_geocode_result = gmaps.reverse_geocode((40.714224, -73.961452))

# Request directions via public transit
now = datetime.now()
directions_result = gmaps.directions("政治大學",
                                     "台灣大學",
                                     mode="transit",
                                     departure_time=now)
f = open("directions_result.txt", "w")
f.write(str(directions_result))
f.close()