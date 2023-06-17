## Технологии
- NestJS
- MongoDB

## Установка

```bash
$ npm i
```
На выбор можно mongoDB запустить в Docker-контейнере, для этого надо поменять порт в .env 27017 на 27018. 
```bash
$ docker-compose up
```

## Запуск

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

На выбор запуск контейнера.
```bash
$ docker start mongo
```

## Пользование

Используется имитация jwt авторизации. Для этого передайте в Bearer авторизацию "Bearer token".

## Документация

http://localhost:5000/api/docs