import { Box } from "@mui/material";
// import { useEffect, useState } from "react";
import CreateRoom from "./CreateRoom";
import PickRoom from "./PickRoom";
import { useNavigate } from "react-router";

function Rooms({ socket, rooms }) {
  const navigate = useNavigate();
  const createRoom = (data) => {
    socket.emit("createRoom", data, (roomID) => {
      navigate(roomID);
    });
  };

  return (
    <Box>
      <PickRoom rooms={rooms} />
      <CreateRoom createRoom={createRoom} />
    </Box>
  );
}

export default Rooms;
