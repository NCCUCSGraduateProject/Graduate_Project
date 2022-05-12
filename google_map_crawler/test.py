from lat_long_crawler import get_nearby_place_from_google_map

# read gowalla dataset file which is a text file seperated by space
with open('loc-gowalla_totalCheckins.txt', 'r') as f:
    count = 0
    lines = f.readlines()
    for line in lines:
        line = line.strip()
        line = line.split('\t')
        lat = line[2]
        long = line[3]
        nearby_places = get_nearby_place_from_google_map(lat, long)
        print(nearby_places)

        count += 1
        if count == 10:
            break

    f.close()