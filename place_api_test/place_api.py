import api_key

API_KEY = api_key.API_KEY

import googlemaps


gmaps = googlemaps.Client(key=API_KEY)

result = gmaps.find_place(input = '國立政治大學', input_type = 'textquery', fields = ['place_id'], language = 'zh-TW')

place_ids = [pair['place_id'] for pair in result['candidates']]

def place(place_id):
    detail = gmaps.place(place_id = place_id, fields = ['adr_address','price_level', 'rating', 'review', 'user_ratings_total'], language="zh-TW")
    return (place_id, detail)

results = dict(map(place, place_ids))

print(results)