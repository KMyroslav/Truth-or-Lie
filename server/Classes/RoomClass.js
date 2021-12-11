const PlayerClass = require("./PlayerClass.js");

class RoomClass {
  constructor({ id, roomName, playersQuantity, deckQuantity, deckSize }, deck) {
    this.id = id;
    this.roomName = roomName;
    this.playersQuantity = playersQuantity;
    this.deckQuantity = deckQuantity;
    this.deckSize = deckSize;
    this.gameStarted = false;
    this.deck = deck;
    this.players = {};
    this.seats = new Array(Number(playersQuantity));
    this.piles = {
      discard: [],
      statement: [],
    };
  }

  addPlayer(name, id) {
    this.players[id] = new PlayerClass(name, id);
  }

  assignSeat(playerInfo, toSeat) {
    if (toSeat) {
      // add logic for change seats
      return;
    }
    this.seats.find((el, i) => {
      if (!el) {
        this.seats[i] = playerInfo;
        console.log(this.seats[i]);
        return true;
      }
      return false;
    });
  }

  shuffleDeck() {
    const deckArr = this.deck;
    let currentIndex = deckArr.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      [deckArr[currentIndex], deckArr[randomIndex]] = [
        deckArr[randomIndex],
        deckArr[currentIndex],
      ];
    }
    this.deck = deckArr;
    // console.log("shuffled");
  }

  drawCards() {
    const playersArr = Object.keys(this.players);
    const remain = this.deck.length % playersArr.length;
    const cardsPerPlayer = (this.deck.length - remain) / playersArr.length;

    playersArr.forEach((player) => {
      this.players[player].cards.push(...this.deck.splice(0, cardsPerPlayer));
    });
    this.piles.discard.push(...this.deck.splice(0));
    console.log("cards drawn");
  }

  startGame() {
    const playersArr = Object.values(this.players);
    if (playersArr.length != this.playersQuantity) {
      console.log("not all players joined");
      return false;
    }
    if (playersArr.find((player) => !player.isReady)) {
      console.log("not all players are ready");
      return false;
    }
    this.shuffleDeck();
    this.drawCards();
    this.gameStarted = true;
    console.log("game started");
    return true;
  }
}

module.exports = RoomClass;

//for multiple decks
// () => {
//   const fullDeck = [];
//   for (let i = 0; i < deckQuantity; i += 1) {
//     fullDeck.push(...deck);
//   }
//   return fullDeck;
// };
