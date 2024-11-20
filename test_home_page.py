from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from selenium.webdriver.chrome.service import Service

service = Service('/Users/PrakharGupta/Downloads/chromedriver-linux64/chromedriver')
driver = webdriver.Chrome(service=service)

try:
    
    driver.get("http://localhost:5001") 

    
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "formWrapper")))

    create_room_link = driver.find_element(By.CLASS_NAME, "createNewBtn")
    create_room_link.click()

   
    room_id_input = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, "inputBox")))
    created_room_id = room_id_input.get_attribute("value")
    print(f"New Room ID: {created_room_id}")

    
    room_id_input.send_keys(created_room_id)
    username_input = driver.find_elements(By.CLASS_NAME, "inputBox")[1]  #
    username = "TestUser"
    username_input.send_keys(username)

    
    join_button = driver.find_element(By.CLASS_NAME, "joinBtn")
    join_button.click()

    
    WebDriverWait(driver, 5).until(EC.url_contains(f"/editor/{created_room_id}"))
    print("Navigation to the editor page successful.")

    time.sleep(10)

except Exception as e:
    print(f"Test failed: {e}")

finally:
    
    driver.quit()
