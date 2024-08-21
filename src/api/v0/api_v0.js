const express = require('express')
const api_router_v0 = express.Router()
const saveDataToFS = require('../modules/saveToFS/saveToFS.js')

const incomeHandler = (req, res, next) => {
  const { data } = req.data
  const dataString = data.toString()
  saveDataToFS(dataString)
  req.status(200)
  res.json('200 | Данные успешно сохранены')
}

const outcomeHandler = (req, res, next) => {
  const { data } = req.data
  const dataString = data.toString()
  saveDataToFS(dataString)
  res.status(200)
  res.json('200 | Данные успешно сохранены')
}

const reportHandler = (req, res, next) => {
  res.status(400)
  res.json("Данный роут предусмотрен, но пока не реализован.")
} 

api_router_v0.post('income', incomeHandler)
api_router_v0.post('outcome', outcomeHandler)
api_router_v0.get('report', reportHandler)

module.exports = api_router_v0
