import selenium.webdriver as webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time


def get_nearby_place_from_google_map(lat, long):
    # set up webdriver
    driver = webdriver.Chrome('chrome_driver/101.0.4951.41-m1')
    driver.maximize_window()
    driver.implicitly_wait(30)

    # open google map by lat and long
    url = 'https://www.google.com/maps/search/@' + str(lat) + ',' + str(long) + ",18z"
    driver.get(url)

    # wait for the page to load
    wait = WebDriverWait(driver, 10)
    
    # load main canvas
    main_canvas = wait.until(EC.element_to_be_clickable((By.XPATH, "//*[name()='canvas']")))
    size = main_canvas.size
    w, h = size['width'], size['height']
    new_w = w/2
    new_h = h/2

    # move to the center of the canvas
    ActionChains(driver).move_to_element_with_offset(main_canvas, new_w, new_h).perform()
    print(driver.title)

    # create a list to save the nearby places
    nearby_places = []

    # get the nearby places from the map
    for i in range(0, 200, 40):
        ActionChains(driver).move_by_offset(100 - i, 100 - i).click().pause(0.1).perform()
        ActionChains(driver).move_by_offset(-(100 - i), -(100 - i)).perform()
        if driver.title != 'Google 地圖':
            print(driver.title)
            nearby_places.append(driver.title)

    for i in range(0, 200, 40):
        ActionChains(driver).move_by_offset(100 + i, 100 - i).click().pause(0.1).perform()
        ActionChains(driver).move_by_offset(-(100 + i), -(100 - i)).perform()
        if driver.title != 'Google 地圖':
            print(driver.title)
            nearby_places.append(driver.title)

    for i in range(0, 200, 40):
        ActionChains(driver).move_by_offset(100 - i, 100 + i).click().pause(0.1).perform()
        ActionChains(driver).move_by_offset(-(100 - i), -(100 + i)).perform()
        if driver.title != 'Google 地圖':
            print(driver.title)
            nearby_places.append(driver.title)

    # turn nearby places into a set to remove duplicates
    nearby_places = set(nearby_places)

    # close the browser
    driver.quit()

    return nearby_places