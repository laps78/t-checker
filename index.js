const express = require('express')
// connect middleware
const logger = require('src/middleware/logger/logger.js')
const saveDataToFS = require('ssrc/middleware/saveToFS/saveToFS.js')
const error = require('src/middleware/reeor.js')
const error404 = require('src/middleware/error/error404.js')// config environment
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3311
const DB_URL = process.env.DB_URL
const DB_NAME = process.env.DB_NAME
const apiV0router = require('src/api/v0')

// append middleware
app.use(express.json())
app.use(logger)
app.use('api/v0/income')
app.use(error)
app.use(error404)

try {
	app.listen(PORT)
} catch(error){
	console.error("Ошибка инициализации приложения:\n", error.stack)
}

