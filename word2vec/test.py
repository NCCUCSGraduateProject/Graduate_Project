import jieba
import spacy
import statistics

print('load model\n')
nlp = spacy.load("zh_core_web_lg")

testWord = "餐廳"
# removed word 便當 ,"珍珠奶茶"
foodArr = ["義大利麵","雞排","豬排","烤肉","蕎麥麵","生魚片","丼飯","壽司","麵包","蛋糕","蛋包飯","炒麵","炒飯","餃子","餅乾","麵線","麵","漢堡","薯條","炸雞","炸魚","炸蝦","牛排","燒烤","火鍋","壽喜燒","燒臘","燒肉","湯圓","鍋貼","燒餅","飯糰","炒米粉","炒米糕","糯米飯","燒賣","燒鴨","燒鵝","豬腳","豬肉","豬腳","鹹酥雞","鍋燒意麵","蔥油餅","甜點","起司","巧克力","焗烤","沙拉"]
garbageWords = ["疫情","稍微","下面"]


for word in foodArr:
    print(word, round(nlp(word).similarity(nlp(testWord)),3))

for word in garbageWords:
    print(round(nlp(word).similarity(nlp(testWord)),3))

total = 0
min = 40
sample = []
for i in foodArr:
    score = 0
    print(i)
    for j in foodArr:
        if i != j:
            currentScore = round(nlp(i).similarity(nlp(j)),3)
            score += currentScore
            print(j,currentScore,end='')
    print()
    print(i,score/len(foodArr))
    print()
    total += score/len(foodArr)
    sample.append(score/len(foodArr))
    if score/len(foodArr) < min:
        min = score/len(foodArr)

print("total average",total/len(foodArr))
print("standart deviation",statistics.stdev(sample))
print("min",min)
            
