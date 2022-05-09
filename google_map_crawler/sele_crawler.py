import selenium.webdriver as webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

import time

driver = webdriver.Chrome('./chrome_driver/101.0.4951.41-m1')
driver.maximize_window()
driver.implicitly_wait(30)
driver.get("https://www.google.com/maps/@30.2359091167,-97.7951395833,18z")
print(driver.title)
wait = WebDriverWait(driver, 10)

main_canvas = wait.until(EC.element_to_be_clickable((By.XPATH, "//*[name()='canvas']")))
size = main_canvas.size
w, h = size['width'], size['height']
new_w = w/2
new_h = h/2
ActionChains(driver).move_by_offset(new_h, new_h).pause(1).perform()
wait.until(EC.element_to_be_clickable((By.XPATH, "//*[name()='canvas']"))).click()
time.sleep(1)
print(driver.title)