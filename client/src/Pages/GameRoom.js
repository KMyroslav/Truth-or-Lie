import { useState } from "react";
import { useNavigate } from "react-router";
import ChooseNickname from "../Components/ChooseNickname/ChooseNickname";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { Box } from "@mui/system";

function GameRoom({ room: { id: roomID }, socket }) {
  const [nickname, setNickname] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();

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

  const handleReady = (e) => {
    setIsReady(!isReady);
    socket.emit("player-ready");
  };

  return !nickname ? (
    <ChooseNickname setNicknameAndJoin={setNicknameAndJoin} />
  ) : (
    <Box>
      <h1>Game</h1>
      <FormControlLabel
        value="Ready"
        control={<Checkbox onChange={handleReady} />}
        label="Ready"
        labelPlacement="start"
      />
    </Box>
  );
}

export default GameRoom;
