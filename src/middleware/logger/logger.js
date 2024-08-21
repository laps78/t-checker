const fs = require("fs")
const os = require("os")

logger = (req, res, next) => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  const { method, url } = req
  const userAgent = req.get("user-Agent")
  const data = hours + ":" + minutes + ":" + seconds + "[" + method + "] " + url + "(" + userAgent
  
  // do log actions
  console.log("[logger]: ", data)
  fs.appenFile("server.log", data + os.EOL, (error) => {
    if (error) throw error
  })
  
  next()
}

module.exports = logger

