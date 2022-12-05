import spacy

print('load model\n')
nlp = spacy.load("zh_core_web_lg")

testWord = "食物"
# removed word 便當 ,"珍珠奶茶"
foodArr = ["義大利麵","雞排","豬排","烤肉","蕎麥麵","生魚片","丼飯","壽司","麵包","蛋糕","蛋包飯","炒麵","炒飯","餃子","餅乾","麵線","麵","漢堡","薯條","炸雞","炸魚","炸蝦","牛排","燒烤","火鍋","壽喜燒","燒臘","燒肉","湯圓","鍋貼","燒餅","飯糰","炒米粉","炒米糕","糯米飯","燒賣","燒鴨","燒鵝","豬腳","豬肉","豬腳","鹹酥雞","鍋燒意麵","蔥油餅","甜點","起司","巧克力","焗烤","沙拉","飲料"]
garbageWords = ["疫情","稍微","下面"]

word = "紅茶"
print(word, round(nlp(word).similarity(nlp(testWord)),3), round(nlp(word).similarity(nlp("餐廳")),3))
word = "拿鐵"
print(word, round(nlp(word).similarity(nlp(testWord)),3), round(nlp(word).similarity(nlp("餐廳")),3))
            
def foodDictTest(word, foodDict):
    totalSimilarity = 0
    for food in foodDict:
        totalSimilarity += nlp(word).similarity(nlp(food))
    return totalSimilarity/len(foodDict)

print(foodDictTest("珍珠奶茶", foodArr))
print(foodDictTest("拿鐵", foodArr))