from lat_long_crawler import get_nearby_place_from_google_map

LIMIT = 2

# read gowalla dataset file which is a text file seperated by space
data_file = open('loc-gowalla_totalCheckins.txt', 'r')
output_file = open('output.txt', 'w')
count = 0

lines = data_file.readlines()
for line in lines:
    line = line.strip()
    line = line.split('\t')
    lat = line[2]
    long = line[3]

    nearby_places = get_nearby_place_from_google_map(lat, long)
    output_file.write(str(nearby_places) + '\n')

    count += 1
    if count == LIMIT:
        break

data_file.close()
output_file.close()