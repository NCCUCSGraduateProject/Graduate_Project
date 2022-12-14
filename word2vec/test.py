import jieba
import spacy
import statistics
import pymongo

print('load model\n')
nlp = spacy.load("zh_core_web_lg")

nlpRestaurant = nlp("餐廳")
nlpFood = nlp("食物")
# removed word 便當 ,"珍珠奶茶"
foodArr = ["義大利麵","雞排","豬排","烤肉","蕎麥麵","生魚片","丼飯","壽司","麵包","蛋糕","蛋包飯","炒麵","炒飯","餃子","餅乾","麵線","麵","漢堡","薯條","炸雞","炸魚","炸蝦","牛排","燒烤","火鍋","壽喜燒","燒臘","燒肉","湯圓","鍋貼","燒餅","飯糰","炒米粉","炒米糕","糯米飯","燒賣","燒鴨","燒鵝","豬腳","豬肉","豬腳","鹹酥雞","鍋燒意麵","蔥油餅","甜點","起司","巧克力","焗烤","沙拉"]
garbageWords = ["疫情","稍微","下面"]
nlpFoodArr = [ nlp(x) for x in foodArr]

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

localUrl = 'mongodb://localhost:27017'

localClient = pymongo.MongoClient(localUrl)
localDb = localClient["placeAPI"]
localCol = localDb["test4"]

print('connect mongo\n')

for doc in localCol.find():
    if  'food' not in doc["types"] and 'restaurant' not in doc['types']:
        print(doc['name'])
        print(doc['types'])
    
i = 0
for doc in localCol.find():

    break # 

    words = filtStopWords(doc['reviews'])

    for word in words:
        nlpWord = nlp(word)
        score1 = round(nlpWord.similarity(nlpFood), 3)
        score2 = round(nlpWord.similarity(nlpRestaurant), 3)
        if score1 > 0.149 and score2 > 0.1:
            totalSimilarity = 0
            for food in nlpFoodArr:
                totalSimilarity += nlpWord.similarity(food)
            if(totalSimilarity/len(foodArr) < 0.3):
                print(word, score1, score2)
        i += 1
        if i > 1000:
            break
