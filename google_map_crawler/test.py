from apify_client import ApifyClient

# Initialize the ApifyClient with your API token
client = ApifyClient('apify_api_yN2quOuiW0Rg1d6gfrQfd0ceZDnhrG1S4OG7')

# Prepare the actor input
run_input = {
    "searchStringsArray": ["restaurant New York"],
    "allPlacesNoSearchAction": "mouse",
    "maxCrawledPlaces": 10,
    "language": "en",
    "maxImages": 0,
    "maxReviews": 0,
    "proxyConfig": { "useApifyProxy": True },
}

# Run the actor and wait for it to finish
run = client.actor("drobnikj/crawler-google-places").call(run_input=run_input)

# Fetch and print actor results from the run's dataset (if there are any)
for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item)