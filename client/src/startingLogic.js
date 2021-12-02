// import './sass/main.scss';

function fetchDeck() {
  return fetch("http://localhost:3000/cards")
    .then((r) => r.json())
    .then(([...deck]) => deck);
}

function shuffleDeck(deckArr) {
  let currentIndex = deckArr.length,
    randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    [deckArr[currentIndex], deckArr[randomIndex]] = [
      deckArr[randomIndex],
      deckArr[currentIndex],
    ];
  }
  return deckArr;
}

function drawCards(deckArr, playersCount) {
  const players = new Array(playersCount);
  for (let i = 0; i < playersCount; i += 1) {
    players[i] = [];
  }

  for (let i = 0; i < deckArr.length; i += 1) {
    players[i % playersCount].push(deckArr[i]);
  }
  return players;
}

function sortCards(deckArr) {
  deckArr.forEach((deck) =>
    deck.sort((a, b) => {
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
    })
  );
  return deckArr;
}

fetchDeck().then((deck) =>
  console.table(sortCards(drawCards(shuffleDeck(deck), 5)))
);
