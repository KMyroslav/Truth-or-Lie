const { nanoid } = require("nanoid");

class PlayerClass {
  constructor(name) {
    this.id = nanoid();
    this.name = name;
    this.cards = [];
    this.hasTurn = false;
    this.isReady = false;
    this.isFinished = false;
  }

  addCards(cards) {
    this.cards.push(cards);
  }

  //   removeCards(cardsToRemove) {
  //     this.cards = [
  //       ...this.cards.filter((card) => {
  //         //true will be returned
  //         !cardsToRemove.find((el)=>el.code === card.code);
  //       }),
  //     ];
  //   }
}

module.exports = PlayerClass;
