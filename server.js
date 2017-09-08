const path = require("path")
const app = require("express")()
const http = require("http").Server(app)
const io = require("socket.io")(http)

const port = 3000

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get("/vendor/socket.io.js", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "vendor", "socket.io.js"))
})

io.on("connection", socket => {
  console.log("A user has connected")

  socket.on("message", message => {
    console.log(message)
    io.emit("message", message)
  })

  socket.on("typing", message => {
    socket.broadcast.emit("typing", message)
  })
})

http.listen(port, function(){
  console.log("Listening on port", port)
})
