import { Typography, Box } from "@mui/material";
import Rooms from "../Components/Rooms/Rooms";

function HomePage({ socket, rooms }) {
  return (
    <Box className="homePage-wrapper">
      <Typography variant="h2">Truth or Lie</Typography>
      <Rooms socket={socket} rooms={rooms} />
    </Box>
  );
}

export default HomePage;
