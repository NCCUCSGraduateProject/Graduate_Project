
import json
import glob


data = []
for f in glob.glob("*.json"):
    with open(f,) as infile:
        data.extend(json.load(infile))
        # print(data)

print(len(data))

with open("merged_file.json",'w') as outfile:
  json.dump(data, outfile)
