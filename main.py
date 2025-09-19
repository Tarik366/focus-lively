from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.service import Service as FirefoxService
from webdriver_manager.firefox import GeckoDriverManager

driver = webdriver.Firefox(service=FirefoxService(GeckoDriverManager().install()))
# Sayfayı aç
url = "https://www.embassy-worldwide.com/embassy/bangladeshi-high-commission-in-bandar-seri-begawan-brunei/"
driver.get(url)

# "li#email" elementini bul
email_element = driver.find_element(By.CSS_SELECTOR, "li#email")

print(email_element.text)

# İş bitince kapat
driver.quit()
