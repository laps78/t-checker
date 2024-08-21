module.exports = (error, req, res, next) => {
  console.error("Ошибка уровня приложения: ", error.stack)
  res.status(500)
  res.send("500: internal server app error")
}

