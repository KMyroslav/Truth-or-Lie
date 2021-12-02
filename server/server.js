const log = console.log;
const { nanoid } = require("nanoid");
const io = require("socket.io")(9999, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const rooms = [
  {
    id: "qIDX1-gaSmO7jxchwhmbG",
    roomName: "room 1",
    playersQuantity: "2",
    deckQuantity: "1",
    deckSize: "52",
    players: [],
  },
  {
    id: "UzkQaAloALWAH5EiWeiZ8",
    roomName: "Room 2",
    playersQuantity: "4",
    deckQuantity: "2",
    deckSize: "52",
    players: [],
  },
  {
    id: "Foo5bAjtYwbcsWz3qxJ6N",
    roomName: "room 3",
    playersQuantity: "6",
    deckQuantity: "4",
    deckSize: "32",
    players: [],
  },
];

io.on("connection", (socket) => {
  log(socket.id);
  socket.on("fetchRooms", () => {
    // is it emiting to everyone??? // apparently not
    io.emit("fetchRooms", rooms);
  });
  socket.on("createRoom", (data) => {
    rooms.push({
      id: nanoid(),
      ...data,
      players: [],
    });
    io.emit("roomCreated", rooms);
  });
  socket.on("join-room", (roomID, nickname) => {
    socket.join(roomID);
    socket.to(roomID).emit("join-room", `${nickname} has joined!`);
    rooms.map((room) => {
      if (room.id !== roomID) {
        return room;
      }
      return {
        ...room,
        players: [
          ...room.players,
          {
            nickname,
          },
        ],
      };
    });
    log(rooms);
  });
});
