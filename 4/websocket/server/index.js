import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

const server = app.listen(PORT, () => {
  console.log("Server is listing on port 8080");
});

const io = new Server(server);
io.on("connection", (socket) => {
  console.log("new user connected!");
  socket.on("chat message", (data) => {
    console.log("user message " + data);
  });
});

// Web Socket Server Configuration.
// const webSocketServer = new WebSocketServer({ server });

// webSocketServer.on("connection", (ws) => {
//   ws.on("message", (data) => {
//     console.log("Received data from client %s:" + data);
//     ws.send("Thanks!");
//   });
// });
