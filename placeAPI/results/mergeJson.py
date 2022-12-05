
import json
import glob


data = []
for f in glob.glob("*.json"):
    with open(f,) as infile:
        data.extend(json.load(infile))
        # print(data)

print(len(data))
print(data[200])

with open("most_recently_merged_file.json",'w') as outfile:
  json.dump(data, outfile)

