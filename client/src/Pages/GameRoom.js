import { useState } from "react";
import ChooseNickname from "../Components/ChooseNickname/ChooseNickname";

function GameRoom({ roomID, socket }) {
  const [nickname, setNickname] = useState(null);

  const setNicknameAndJoin = (nickname) => {
    setNickname(nickname);
    socket.emit("join-room", roomID, nickname);
    socket.on("join-room", (message) => {
      alert(message); // add pnotify
    });
  };

  return !nickname ? (
    <ChooseNickname setNicknameAndJoin={setNicknameAndJoin} />
  ) : (
    <h1>Game</h1>
  );
}

export default GameRoom;
