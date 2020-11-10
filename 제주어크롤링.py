import requests 
import re
from bs4 import BeautifulSoup
import json
from collections import OrderedDict

User_Agent_head = {"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36"}
tojson_방언 = OrderedDict()
tojson_표준어 = OrderedDict()

page = 1
표준어 = []
방언 = []
for page in range(1,73):
    url = "https://www.jeju.go.kr/culture/dialect/dictionary.htm?indexP=&pageSize=100&page={}".format(page)
    res = requests.get(url, headers = User_Agent_head)
    res.raise_for_status()
    soup = BeautifulSoup(res.text, "html5lib")

    방언들 = soup.find_all("a", attrs = {"class" : "view-history"})
    표준어들 = soup.find_all("td", attrs = {"class" : "dotdotdot title"})

    for 언어 in 표준어들:
        표준어.append(언어.get_text())
    for 언어 in 방언들:
        방언.append(언어.get_text())
    page += 1


for i in range(len(표준어)):
    tojson_방언[방언[i]] = 표준어[i]
    tojson_표준어[표준어[i]] = 방언[i]

with open('방언.json', 'w', encoding='utf-8') as makeJson:
    json.dump(tojson_방언, makeJson, ensure_ascii=False, indent='\t')

with open('표준어.json', 'w', encoding='utf-8') as makeJson:
    json.dump(tojson_표준어, makeJson, ensure_ascii=False, indent='\t')