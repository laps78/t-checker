const express = require('express')

const dotenv = require('dotenv')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3311
const DB_URL = process.env.DB_URL
const DB_NAME = process.env.DB_NAME
const apiV0router = require('src/api/v0')

try {
	app.listen(PORT)
} catch(error){
	console.error("Ошибка инициализации приложения:\n", error)
}

