const http = require("http");
const express = require("express");
const path = require("path");

const app = express();
const port = 3030;
const clientPath = path.resolve(__dirname, "../client");
const distPath = path.resolve(__dirname, "../../../dist");

app.use(express.static(clientPath));
app.use(express.static(distPath));

const server = http.createServer(app);

server.on("error", err => {
  console.log("Server error: ", err);
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
