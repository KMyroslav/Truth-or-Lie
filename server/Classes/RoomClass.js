class RoomClass {
  constructor({ id, roomName, playersQuantity, deckQuantity, deckSize }) {
    this[id] = {
      id,
      roomName,
      playersQuantity,
      deckQuantity,
      deckSize,
      players: [],
      piles: {
        discard: [],
        statement: [],
      },
    };
  }
}

module.exports = RoomClass;
