# t-checker api

![t-checker-logo](./client-term/src/assets/t-ckecker-512.png "t-checker logo")

v0.1 features:

1. Принимает и обрабатввает запросы с данными для сохранения
   на порту 3311
2. Сохраняет данные в простейшей БД
3. Клиентский модуль [client-term](./client-term/) содержит интерфейс приложения для имитации.замны терминала считывателя. Модуль развернут на ghg-pages и доступен для тестирования -> [открыть модуль >>>](https://laps78.github.io/t-checker).

![t-ckecker mock](./client-term/src/assets/post-image-1.png "t-checker на экране iphone 15")

Тип запроса: POST
url запроса: /v0/checkin
пример data:

’’’
{
timestamp: <unix timestamp string>,
user:
}
'''
