import selenium
import requests
from bs4 import BeautifulSoup\

from selenium import webdriver

driver = webdriver.Chrome('chrome_driver/101.0.4951.41-m1')
driver.get('https://www.google.com.tw/maps/@25.0040383,121.5486171,15z/data=!3m1!4b1!4m3!11m2!2skZvKXc01SdOgjmwZy4u--Q!3e3?hl=zh-TW')
# print(driver.page_source)
# print(res.text)

soup = BeautifulSoup(driver.page_source, "html.parser")
all_places = soup.find(class_ = 'm6QErb DxyBCb kA9KIf dS8AEf')
children = all_places.find_all('div', recursive=False, attrs={"aria-label": True})
for child in children:
    print(child['aria-label'])

driver.close()