class RoomClass {
  constructor({ id, roomName, playersQuantity, deckQuantity, deckSize }) {
    this.id = id;
    this.roomName = roomName;
    this.playersQuantity = playersQuantity;
    this.deckQuantity = deckQuantity;
    this.deckSize = deckSize;
    this.players = [];
    this.piles = {
      discard: [],
      statement: [],
    };
  }
}

module.exports = RoomClass;
