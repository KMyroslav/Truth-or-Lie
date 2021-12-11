import { Card } from "@mui/material";
import { useEffect } from "react";
import seatsClassNames from "./seatsClassNames";

function Seats({ socket, roomSeats, setRoomSeats, setPlayersSeat }) {
  const seatsToRender = seatsClassNames(roomSeats.length);

  useEffect(() => {
    socket.on("seat-assigned", (seats) => {
      let playersSeatIndex = null;
      seats.find((el, i) => {
        if (el.id === socket.id) {
          playersSeatIndex = i;
          return true;
        }
        return false;
      });
      const fixedSeats = [...seats.splice(playersSeatIndex), ...seats];
      console.log("seat-assigned");
      setPlayersSeat(playersSeatIndex);
      setRoomSeats(fixedSeats);
    });
  }, [setPlayersSeat, setRoomSeats, socket]);

  return roomSeats.map((player, i) => {
    if (i === 0) {
      return null;
    }
    return (
      <Card
        key={`seat-${i}`}
        variant="outlined"
        className={`seat seat-${seatsToRender[i - 1]}`}
      >
        <p>{(player && player.name) || i}</p>
      </Card>
    );
  });
}

export default Seats;
