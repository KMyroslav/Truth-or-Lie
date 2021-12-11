import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ChooseNickname from "../Components/ChooseNickname/ChooseNickname";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Box } from "@mui/system";
import Seats from "../Components/Seats/Seats";
import sortGroupCards from "../Components/sortCards";

function GameRoom({ room: { id: roomID, playersQuantity, seats }, socket }) {
  const [token, setToken] = useState(socket.id);
  const [nickname, setNickname] = useState(null);
  const [cards, setCards] = useState([]); // add fetch cards
  const [roomSeats, setRoomSeats] = useState(seats);
  const [playersSeat, setPlayersSeat] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("deal-cards", (cards) => {
      setCards(sortGroupCards(cards));
    });
  }, [socket]);

  const setNicknameAndJoin = (nickname) => {
    setNickname(nickname);
    socket.emit("join-room", roomID, nickname, (isSuccess, message) => {
      if (!isSuccess) {
        alert(message); // add pnotify
        navigate("/");
        return;
      }
      alert(message); // add pnotify
    });
    socket.on("join-room", (message) => {
      alert(message); // add pnotify
    });
  };

  const handleCardSelect = (e) => {
    // WONT WORK WITH MULTIPLE DECKS!!! BECAUSE OF NOT UNIQUE CODE
    const selectedCode = e.currentTarget.attributes.value.value;
    const selectedCard = cards.find((card) => card.code === selectedCode);
    //check if card already was selected
    const idx = selectedCards.findIndex(
      (card, i) => card.code === selectedCard.code
    );
    if (idx !== -1) {
      setSelectedCards([...selectedCards.filter((_, i) => idx !== i)]);
      e.currentTarget.classList.remove("selected-card");
      return;
    }
    //push card to selected arr
    setSelectedCards([...selectedCards, selectedCard]);
    // display selected card/-s
    e.currentTarget.classList.add("selected-card");
  };

  return (
    <Box>
      {!nickname && <ChooseNickname setNicknameAndJoin={setNicknameAndJoin} />}
      <Box>
        <Seats
          socket={socket}
          roomSeats={roomSeats}
          setRoomSeats={setRoomSeats}
          setPlayersSeat={setPlayersSeat}
        />
        <FormControlLabel
          value="Ready"
          control={
            <Checkbox
              onChange={() => {
                socket.emit("player-isReady", token, roomID);
              }}
            />
          }
          label="Ready"
          labelPlacement="start"
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "10%",
            left: "50%",
            display: "flex",
            transform: "translate(-50%, 50%)",
            outline: "1px solid red",
            width: "90%",
            paddingLeft: "48px",
          }}
        >
          {cards.map((card, i) => {
            const cardsQuantity = cards.length;
            return (
              <img
                onClick={(e) =>
                  //e.currentTarget.attributes.value.value <- gets value from attribute
                  handleCardSelect(e)
                }
                src={card.image}
                key={card.code} // add unique key, mb on server or db
                value={card.code}
                className={"player-card"}
                alt=""
                style={{
                  width: "60px",
                  marginLeft: `calc(100% / ${cardsQuantity} - 60px)`,
                }}
              />
            );
          })}{" "}
        </Box>
      </Box>
    </Box>
  );
}

export default GameRoom;
