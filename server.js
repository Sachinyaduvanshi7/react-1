const express = require("express");
const app = express();
const path = require("path");

app.use("/metrics", require("./routes/metrics.route"));
app.use("/prom", require("./routes/prom.route"));

const http = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public-backup"));
app.use(express.static(path.join(__dirname, "build")));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/build/", "index.html"));
});

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Socket
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("Connected...");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
