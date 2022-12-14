import spacy
import pandas as pd
import numpy as np

zh = spacy.load('zh_core_web_lg')

df = pd.read_csv('review_js.csv')

print(df.head())

bow = dict()

for index, row in df.iterrows():
    print(index, row['review'])
    if type(row['review']) is not str:
        continue
    doc = zh(row['review'])
    for token in doc:
        if not token.is_stop and not token.is_punct and len(token.text) > 2:
            if token.text in bow:
                bow[token.text] += 1
            else:
                bow[token.text] = 1
            # print(token.text, end=" ")
    print()

print(bow)
print(len(bow))