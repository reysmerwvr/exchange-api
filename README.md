# Exchange API application

This is the API for exchange app.

## Requirements

  - Node.js >= 8.0.0
  - npm >= 3.0.0

## Version

1.0.0

## Installation

Download zip file and extract it [latest pre-built release](https://github.com/reysmerwvr/exchange-api). Or clone the repository and cd into it.

Exchange-API uses a number of open source projects to work properly:

* [Adonis] - Node.js web framework
* [Axios] - Axios
* [Lodash] - Lodash

Install the dependencies and start the server.

## Setup

```bash
npm i -g @adonisjs/cli
```

Install the dependencies.

```bash
cd exchange-api

npm install

cp .env.example .env

adonis key:generate
```

If you don't have `.env` file you can use the example one. Just rename `.env.example` to `.env`. Enter your configuration here. (MySQL Database Connection, 
Applicacion Name, Environment)

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### Seeds

Run the following command to run startup seeds.

```js
adonis seed
```
After run seeds, use one user's emails seeded in database as credentials to log in to application. e.g.

```json
{ "email": "bo@suavdeg.gw", "password": "12345678" }
```

### Run

Run the following command to start the development server

```js
adonis serve --dev
```

### Wiki

Wiki API Docs [Wiki](https://github.com/reysmerwvr/exchange-api/wiki).

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does 
its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Adonis]: <https://adonisjs.com/>
   [Axios]: <https://github.com/axios/axios/>
   [Lodash]: <https://lodash.com//>