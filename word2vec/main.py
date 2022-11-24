# -*- coding: utf-8 -*-

import jieba
import spacy

print('load model\n')
nlp = spacy.load("zh_core_web_lg")

nlp('口味不錯，便當裝的滿滿可可可可以吃飽飽。目前不開放內用，不過店裡面好像沒冷氣，真要裡面吃會比較熱。')

with open('./stops.txt', 'r', encoding='utf8') as f:
    global stopwords
    stopwords = f.read().split('\n')
  
stopwords.append('\n')
stopwords.append('\n\n')
stopwords.append('\n\n\n')

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
ex = ['櫃檯客客氣氣，且算相對重視防疫的店家，疫情期間僅提供外帶。\n運用在地特色鮪魚醬炒出來的飯其它地方應該很難吃到，蠻大一份也蠻好吃的，粒粒分明，飯不會過乾、菜還是脆的，鮪魚醬跟飯確確實實結合在一起，不過它個性太強，有稍微搶走其他元素的存在感。\n\n註：以上為本人感想，每個人的觀感不同，心得僅供參考。', '炒泡麵加辣好吃，重點是最下面還會藏一顆荷包蛋，每次吃每次忘記，麵一挖才發現，在綠島一個半月最常吃的小吃\n肉絲炒飯偏油，鮪魚醬炒飯太鹹\n鍋燒烏龍有三顆蛤蜊，cp值高', '鮪魚醬炒飯蠻特別的，有點辣，\n海草炒蛋吃不太出特殊之處。\n份量滿多的但價格也不便宜', '因疫情關係只能外帶，要前往的朋友也可以自備容器減少一次性餐盒使用。鮪魚醬炒飯份量超多，食量小的人可以兩人共分一份沒問題，鮪魚炒蛋也是份量滿多，炒泡麵和水餃雖然沒前面兩道驚艷但也還不錯，整體來講是個平價又好吃的小吃店。', '口味不錯，便當裝的滿滿滿可以吃飽飽。目前不開放內用，不過店裡面好像沒冷氣，真要裡面吃會比較熱。']

print('filter test:\n\n')

# 做embedding並產生vectors
def word2vec(words):
    vectors = []
    for word in words:
        vectors.append(nlp(word).vector.tolist())
    return vectors



import pymongo
myclient = pymongo.MongoClient("mongodb+srv://mark:WNQmnmMW1Eob4gFi@cluster0.gvyaavk.mongodb.net/?retryWrites=true&w=majority")
mydb = myclient["gp"]
mycol = mydb["map"]

print('connect mongo\n')

i = 1
for x in mycol.find():
    #print(len(x['reviews']))
    words = filtStopWords(x['reviews'])
    #print(words)
    print(i, end='\r')
    i += 1
    vectors = word2vec(words)

    query = {"place_id": x['place_id']}
    newvalues = {"$set": {"reviews_spacy": vectors}}
    mycol.update_one(query, newvalues)
    
    #print(vectors[0])
myclient.close()