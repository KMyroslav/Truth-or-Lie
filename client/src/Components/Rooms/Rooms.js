import { Box } from "@mui/material";
// import { useEffect, useState } from "react";
import CreateRoom from "./CreateRoom";
import PickRoom from "./PickRoom";

function Rooms({ socket, rooms }) {
  const createRoom = (data) => {
    socket.emit("createRoom", data);
  };

  return (
    <Box>
      <PickRoom rooms={rooms} />
      <CreateRoom createRoom={createRoom} />
    </Box>
  );
}

export default Rooms;
