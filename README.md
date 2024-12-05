# t-checker api

![t-checker-logo](./client-term/src/assets/t-ckecker.sketch.png "t-checker logo")

v0.1 features:

1. Принимает и обрабатввает запросы с данными для сохранения
   на порту 3311
2. Сохраняет данные в простейшей БД

Тип запроса: POST
url запроса: /v0/checkin
пример data:

’’’
{
timestamp: <unix timestamp string>,
user:
}
'''
