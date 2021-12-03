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

      GameObj.addPlayer(roomID, nickname, socket.id);
      cb(true, "Joined!");
      log(room.players);
      return;
    }
    cb(false, "Can't join room, no available seats");
  });
});

GameObj.addRoom({
  id: "qIDX1-gaSmO7jxchwhmbG",
  roomName: "room 1",
  playersQuantity: "3",
  deckQuantity: "1",
  deckSize: "52",
});

GameObj.addPlayer("qIDX1-gaSmO7jxchwhmbG", "Marcus", "id-1");
GameObj.addPlayer("qIDX1-gaSmO7jxchwhmbG", "Harry", "id-2");
GameObj.addPlayer("qIDX1-gaSmO7jxchwhmbG", "John", "id-3");
GameObj.rooms["qIDX1-gaSmO7jxchwhmbG"].startGame();

log(GameObj.rooms["qIDX1-gaSmO7jxchwhmbG"]);
