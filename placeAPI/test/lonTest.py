from geopy import distance

place1 = ( 25.012595, 121.510101) # 緯經度 lat/lon
place2 = ( 25.011428, 121.508137)
print(distance.distance(place1, place2).meters)

lat, lon = place1
target = ( lat, lon)
counter = 0
while distance.distance( place1, target).meters < 100.0:
    lon += 0.000001
    target = ( lat, lon)
    counter +=1
    # print(target)
print('final',target)
x,y = target
print(round(x,7),round(y,7))


print(distance.distance(target, place1).km)
print(counter)
a, b = place1
print(x-a,y-b)