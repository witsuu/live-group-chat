const http = require("http");
const express = require("express");
const app = express();
const socketio = require("socket.io");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const Route = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
app.use(cors());
app.use(Route);

const server = http.createServer(app);

const io = socketio(server);

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log(name);

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${name} joined`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(PORT || 8000, () =>
  console.log(`Server has started on Port ${PORT}`)
);
