import { useState } from "react";
import { useNavigate } from "react-router";
import ChooseNickname from "../Components/ChooseNickname/ChooseNickname";

function GameRoom({ room: { id: roomID }, socket }) {
  const [nickname, setNickname] = useState(null);
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

  return !nickname ? (
    <ChooseNickname setNicknameAndJoin={setNicknameAndJoin} />
  ) : (
    <h1>Game</h1>
  );
}

export default GameRoom;
