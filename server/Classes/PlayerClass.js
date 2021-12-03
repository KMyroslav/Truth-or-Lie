const { nanoid } = require("nanoid");

class PlayerClass {
  constructor(name, id) {
    this.token = id;
    this.name = name;
    this.cards = [];
    this.hasTurn = false;
    this.isReady = false;
    this.isFinished = false;
  }

  addCards(cardsArr) {
    this.cards.push(...cardsArr);
  }

  removeCards(cardsToRemove) {
    this.cards = [
      ...this.cards.filter((card) => {
        //true will be returned
        !cardsToRemove.find((el) => el.code === card.code);
      }),
    ];
  }

  sortCards() {
    this.cards.sort((a, b) => {
      let valueA = 0;
      let valueB = 0;

      if (a.suit === "HEARTS") {
        valueA += 45;
      } else if (a.suit === "DIAMONDS") {
        valueA += 30;
      } else if (a.suit === "CLUBS") {
        valueA += 15;
      }

      if (a.value === "ACE") {
        valueA += 14;
      } else if (a.value === "KING") {
        valueA += 13;
      } else if (a.value === "QUEEN") {
        valueA += 12;
      } else if (a.value === "JACK") {
        valueA += 11;
      } else {
        valueA += Number(a.value);
      }
      if (b.suit === "HEARTS") {
        valueB += 45;
      } else if (b.suit === "DIAMONDS") {
        valueB += 30;
      } else if (b.suit === "CLUBS") {
        valueB += 15;
      }
      if (b.value === "ACE") {
        valueB += 14;
      } else if (b.value === "KING") {
        valueB += 13;
      } else if (b.value === "QUEEN") {
        valueB += 12;
      } else if (b.value === "JACK") {
        valueB += 11;
      } else {
        valueB += Number(b.value);
      }
      return valueB - valueA;
    });
  }
}

module.exports = PlayerClass;
