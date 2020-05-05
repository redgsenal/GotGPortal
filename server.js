const express = require('express');
const path = require("path");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.render("index", { title: "Game of the Generals" });
});

app.get('/user', (req, res) => {
  res.render("user", { title: "Game of the Generals" });
});

app.get('/board', (req, res) => {
  res.render("board", { title: "Game of the Generals" });
});

app.get('/demo', (req, res) => {
  res.render("demo", { title: "Game of the Generals" });
});

app.listen(port, () => {
  console.log('listening on *:' + port);
});