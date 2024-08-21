const express = require('express')
const env = require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3311
const apiV0router = require('src/api/v0')

try {
	app.listen(PORT)
} catch(error){
	console.error("Ошибка инициализации приложения:\n", error)
}

