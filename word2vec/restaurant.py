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

print('create stop words\n\n')
nlp.Defaults.stop_words |= set(stopwords)

print('stop words created\n')

# filt stopwords和 不相關的詞
def filtStopWords(documents):
    words = set()
    i = 0
    #print('hi')
   
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

remoteUrl = "mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/?retryWrites=true&w=majority"
localUrl = "mongodb://localhost:27017"
myclient = pymongo.MongoClient(localUrl)
mydb = myclient["placeAPI"]
mycol = mydb["test4"]

print('connect mongo\n')

foodArr = ["義大利麵","烤肉","生魚片","丼飯","壽司","麵包","蛋糕","飯","麵","炒飯","餃子","餅乾","麵線","漢堡","薯條","炸雞","炸魚","炸物","牛排","燒烤","火鍋","壽喜燒","燒臘","燒肉","湯圓","鍋貼","燒餅","飯糰","點心","豬肉","鹹酥雞","鍋燒意麵","蔥油餅","甜點","起司","巧克力","焗烤","沙拉","酒","調酒",'甜點']

i = 1
count = 0   
wordsdel = []
wordskept = []
nlpFood = nlp("食物")
nlpRestaraunt = nlp("餐廳")
nlpFoodArr = [ nlp(x) for x in foodArr]

cursor = mycol.find({}, no_cursor_timeout=True,batch_size=10)
for doc in cursor:
    #print(len(doc['reviews']))
    words = filtStopWords(doc['reviews'])
    # print("words: ",words)
    i += 1
    if i < 32450:
        continue

    # test each word in words' similarity 

    phraseskept = []

    for word in words:

        similar = False
        
        nlpWord = nlp(word)
        if nlpWord.similarity(nlpFood) >= 0.149 and nlpWord.similarity(nlpRestaraunt) > 0.1: 
        # if nlpWord.similarity(nlpFood) >= 0.4 or nlpWord.similarity(nlp(keywords[0])) > 0.4: 
            # similar = True

            totalSimilarity = 0
            for food in nlpFoodArr:
                totalSimilarity += nlpWord.similarity(food)
            if(totalSimilarity/len(foodArr) >= 0.3):
                # print(word, "average similarity", totalSimilarity/len(foodArr))
                similar = True
        
        if similar:
            phraseskept.append(word)
            count += 1
        else:
            wordsdel.append(word)

    # keep the first five words in sorted phrasekept to wordskept
    # phraseskept.sort(key=lambda doc: doc['similarity'], reverse=True)
    # for phrase in phraseskept[:5]:
        # wordskept.append(phrase['phrase'])

    print(doc['name'])
    for word in phraseskept:
        print(word,end=' ') 
    print('\n')
    

    vectors = word2vec(phraseskept)
    query = {"place_id": doc['place_id']}
    newvalues = {"$set": {"reviews_spacy": vectors,
                          "tags": phraseskept}}
    mycol.update_one(query, newvalues)

    if i % 100 == 0:
        print(i)
        print('\n\n\n\n\n\n')
        print('-------------------------------------')
        print('\n\n\\n\n\n\n')
        

cursor.close()
myclient.close()
print(wordskept)
print(wordsdel)
print(count/len(wordsdel))




    
