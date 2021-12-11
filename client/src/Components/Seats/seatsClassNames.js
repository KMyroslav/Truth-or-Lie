export default function seatsClassNames(seatsQuantity) {
  let seatsToRender = [];
  switch (seatsQuantity) {
    case 2:
      seatsToRender = [5];
      break;
    case 3:
      seatsToRender = [4, 6];
      break;
    case 4:
      seatsToRender = [3, 5, 7];
      break;
    case 5:
      seatsToRender = [2, 4, 6, 8];
      break;
    case 6:
      seatsToRender = [1, 3, 5, 7, 9];
      break;
    case 7:
      seatsToRender = [2, 3, 4, 6, 7, 8];
      break;
    case 8:
      seatsToRender = [2, 3, 4, 5, 6, 7, 8];
      break;
    case 9:
      seatsToRender = [1, 2, 3, 4, 6, 7, 8, 9];
      break;
    case 10:
      seatsToRender = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      break;

    default:
      break;
  }
  return seatsToRender;
}
