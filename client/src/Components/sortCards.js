function sortGroupCards(deckArr) {
  //   const grouppedCardsObj = {};
  //   deckArr.forEach((card) => {
  //     grouppedCardsObj.hasOwnProperty(card.value)
  //       ? (grouppedCardsObj[card.value] = [...grouppedCardsObj[card.value], card])
  //       : (grouppedCardsObj[card.value] = [card]);
  //   });

  //   const sortedGrouppedDeck = Object.values(grouppedCardsObj);
  return [...deckArr].sort((a, b) => {
    return (b.sortValue || Number(b.value)) - (a.sortValue || Number(a.value));
  });
  //   return sortedGrouppedDeck;
}

export default sortGroupCards;
