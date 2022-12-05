import requests
import constant

url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJJbdpkwiNbzQRnv6vhpSvcb4&key="+constant.API_KEY

payload={}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
