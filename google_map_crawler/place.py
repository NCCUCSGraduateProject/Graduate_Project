import requests

url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=30.2359091167%2C-97.7951395833&radius=300&key=AIzaSyDVAHRBY_1Y5diyzeW_uUwr0dqOnRCJw8U"

payload={}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)