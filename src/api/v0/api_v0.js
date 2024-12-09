const express = require('express')
const api_router_v0 = express.Router()
const saveDataToFS = require('../modules/saveToFS/saveToFS.js')
const saveToDB = () => console.info('implement DB connector to represent this feature');

const dataSaver = (data) => {
  saveDataToFS(data)
  saveToDB(data)
}

const checkinHandler = (req, res, next) => {
  const { data } = req.data
  const dataString = data.toString()
  dataSaver(dataString)
  req.status(200)
  res.json('200 | Данные успешно сохранены')
}

const checkoutHandler = (req, res, next) => {
  const { data } = req.data
  const dataString = data.toString()
  dataSaver(dataString)
  res.status(200)
  res.json('200 | Данные успешно сохранены')
}

const reportHandler = (req, res, next) => {
  res.status(400)
  res.json("Данный роут предусмотрен, но пока не реализован.")
} 

api_router_v0.post('income', checkinHandler)
api_router_v0.post('outcome', checkoutHandler)
api_router_v0.get('report', reportHandler)

module.exports = api_router_v0
