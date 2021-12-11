const log = console.log;
const { nanoid } = require("nanoid");
const GameClass = require("./Classes/GameClass.js");
const io = require("socket.io")(9999, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const GameObj = new GameClass();

io.on("connection", (socket) => {
  log(socket.id);

  socket.on("fetchRooms", () => {
    // is it emiting to everyone??? // apparently not
    if (!GameObj.rooms) {
      return;
    }
    io.emit("fetchRooms", Object.values(GameObj.rooms));
  });

  socket.on("createRoom", (data, cb) => {
    const roomID = nanoid(); // might transfer to obj method
    GameObj.addRoom({
      id: roomID,
      ...data,
    });
    io.emit("roomCreated", Object.values(GameObj.rooms));
    cb(roomID);
  });

  socket.on("join-room", (roomID, nickname, cb) => {
    const room = GameObj.rooms[roomID];

    if (Object.keys(room.players).length < room.playersQuantity) {
      socket.join(roomID);
      socket.to(roomID).emit("join-room", `${nickname} has joined!`);

      room.addPlayer(nickname, socket.id);
      cb(true, "Joined!");

      room.assignSeat({ id: socket.id, name: nickname });
      io.to(roomID).emit("seat-assigned", room.seats);
      return;
    }
    cb(false, "Can't join room, no available seats");
  });

  socket.on("player-isReady", (token, room) => {
    const players = GameObj.rooms[room].players;
    players[token].isReady = !players[token].isReady;
    //add emit to everyone that player is ready
    if (GameObj.rooms[room].startGame()) {
      Object.values(players).forEach((player) => {
        io.to(player.token).emit("deal-cards", player.cards);
      });
    }
  });
});

GameObj.addRoom({
  id: "qIDX1-gaSmO7jxchwhmbG",
  roomName: "room 1",
  playersQuantity: "3",
  deckQuantity: "1",
  deckSize: "52",
});

// GameObj.rooms["qIDX1-gaSmO7jxchwhmbG"].addPlayer("Marcus", "id-1");
// GameObj.rooms["qIDX1-gaSmO7jxchwhmbG"].addPlayer("Harry", "id-2");
// GameObj.rooms["qIDX1-gaSmO7jxchwhmbG"].startGame();

// log(GameObj.rooms["qIDX1-gaSmO7jxchwhmbG"].players);
