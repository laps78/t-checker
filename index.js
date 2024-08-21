const express = require('express')
// connect middleware
const logger = require('./src/middleware/logger/logger.js')
const error = require('./src/middleware/error/error.js')
const error404 = require('./src/middleware/error/error404.js')
// load api request handlers
const api_router_v0 = require('./src/api/v0/api_v0.js')
// config environment
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3311
const DB_URL = process.env.DB_URL
const DB_NAME = process.env.DB_NAME

// append middleware
app.use(express.json())
app.use(logger)
app.use('api/v0/', api_router_v0)
app.use(error)
app.use(error404)

try {
	app.listen(PORT, () => {
		console.info("================================================================================")
		console.info("| T-checker API успешно запущен и доступен по адресу http://localhost:" + PORT + "/api |")
		console.info("================================================================================")
	})
} catch(error){
	console.error("Ошибка инициализации приложения:\n", error.stack)
}

