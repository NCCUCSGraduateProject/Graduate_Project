# -*- coding: utf-8 -*-
import jieba
import spacy

print('load model\n')
nlp = spacy.load("zh_core_web_lg")

with open('./stops.txt', 'r', encoding='utf8') as f:
    global stopwords
    stopwords = f.read().split('\n')
  
stopwords.append('\n')
stopwords.append('\n\n')
stopwords.append('\n\n\n')
stopwords.append('⋯')
stopwords.append('😆')
stopwords.append('📍')
stopwords.append('🌟')

print('create stop words\n\n')
nlp.Defaults.stop_words |= set(stopwords)

print('stop words created\n')

# filt stopwords和 不相關的詞
def filtStopWords(documents):
    words = set()
    i = 0
   
    doc = jieba.cut(documents.replace(' ', ''))
    for token in doc:  
        if str(token) not in nlp.Defaults.stop_words:
            words.add(str(token))
       
    return words

print('filter test:\n\n')

# 做embedding並產生vectors
def word2vec(words):
    vectors = []
    for word in words:
        vectors.append(nlp(word).vector.tolist())
    return vectors

def word2vec2(words):
    return [nlp(word).vector.tolist() for word in words]


import pymongo

remoteUrl = "mongodb://localhost:57017"
localUrl = "mongodb://localhost:27017"
myclient = pymongo.MongoClient(remoteUrl)
mydb = myclient["gp"]
mycol = mydb["map"]

print('connect mongo\n')

i = 1
totalWords = 0
count = 0   
wordsdel = []
wordskept = []
nlpScenery = nlp("景點")
nlpSea = nlp("海")
nlpMuseum = nlp("博物館")
nlpForest = nlp('森林')
nlpTrails = nlp('步道')
nlpPark = nlp('公園')

nlpWords = [nlpSea, nlpMuseum, nlpForest, nlpTrails, nlpPark]

cursor = mycol.find({}, no_cursor_timeout=True,batch_size=10)
for doc in cursor:

    i += 1
    if i % 1000 == 0:
        print('\n\n\n\n\n\n')
        print('-------------------------------------')
        print('\n\n\\n\n\n\n')
        print(i)
        print('\n\n\n\n\n\n')
        print('-------------------------------------')
        print('\n\n\\n\n\n\n')



    if 'food' not in doc["types"] or 'restaurant' not in doc['types']:
        words = filtStopWords(doc['reviews'])

        # test each word in words' similarity 

        phraseskept = []

        for word in words:
            totalWords += 1
            nlpWord = nlp(word)

            keepWord = False
            # print(word,end=' ')
            for testWord in nlpWords:
                similarityScore = nlpWord.similarity(testWord)
                if similarityScore > 0.35:
                    keepWord = True
                # print(round(similarityScore,3),end=' ')
            # print()

            if nlpWord.similarity(nlpScenery) >= 0.3  or keepWord: # and nlpWord.similarity(nlpLandscape)
                phraseskept.append(word)
                wordskept.append(word)
                count += 1

        print(doc['name'])
        print(doc['types'])
        print(phraseskept)
        print('\n')

        vectors = word2vec(phraseskept)
        query = {"place_id": doc['place_id']}
        newvalues = {"$set": {"reviews_spacy": vectors,
                            "tags": phraseskept}}
        mycol.update_one(query, newvalues)


        
        


cursor.close()
myclient.close()
print(wordskept)

'''

print(count)
print(totalWords)

nlpWords.append(nlpScenery)

for word in wordskept:
    print(word)
    for testWord in nlpWords:
        print(round(nlp(word).similarity(testWord),3), end=' ')
    print()

'''  



    
