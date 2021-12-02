class GameClass {
  addRoom({ id, roomName, playersQuantity, deckQuantity, deckSize }) {
    this.rooms = {
      ...this.rooms,
      [id]: {
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
      },
    };
  }

  removeRoom(id) {
    delete this.rooms[id];
  }

  joinPlayer(player) {
    this.players.push(player);
  }
}

export default GameClass;
