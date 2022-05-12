---
marp: true
---
# 地圖相關的推薦系統
  ## 旅遊景點推薦跟規劃

---
## 畫大餅
 - 針對使用者輸入的地點規劃路線 
 - 針對使用者規劃的路線與其他資訊（例如：曾經去過地點或同叢集使用者之資料）推薦地點。

---
## Data 選擇
 - 目的：
   - 有資料才能做 POC
   - 希望可以用來做訓練和評估
 - 困難：
   - 難找到有內容（content）和使用者與地點（user relation with location）的資料
 - 目前嘗試：
   - 雖然有使用者與地點（user relation with location）的資料集沒有地點相關內容，但是可以通過一些隨附資料爬取相關內容。
---
## Gowalla
  - Gowalla 是一個基於位置（location-based）的社交網站，用戶可以在其中通過打卡(check-in)來分享他們的位置。 友誼網絡（friendship-network）是無向（undirected)）的，是使用他們的公共 API 收集的，由 196,591 個節點和 950,327 個邊組成。 在 2009 年 2 月至 2010 年 10 月期間，我們共收集了這些用戶的 6,442,890 次打卡。
  - 目前用於一些基於位置（location-based）和基於社交網路（social relation based）的研究。
---
## Gowalla
 - 結構：
   - userid, date, lat, long, placeid
 - 範例：
   - *0, 2010-10-19T23:55:27Z, 30.2359091167, -97.7951395833, 22847*
 - 原本這個 dataset 還有 user 跟 user 之間的好友關係，目前用於一些 locational based 和 social relation based 的研究。

---
## 拿地圖相關的資料
 - **Place API** from Google
   - pros:
     - Google 直接支援
   - cons:
     - $300 基本使用金後計費
     - 我的金融卡一直綁不了
 - **Apify google map crawler** from Apify
   - pros: 
     - 功能很多（比 Place API 還多）
   - cons:
     - 每個月只有 $5 上限，之後要加錢
     - 很慢，加速也要錢

---
## 拿地圖相關的資料
 - **Selenium** 自己寫 Python 腳本 
   - pros:
     - 免費
     - 模擬使用者操作，使用者拿得到的我們都拿得到
   - cons:
     - 自己寫
     - 模擬使用者操作其實很慢
