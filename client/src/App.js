import HomePage from "./Pages/HomePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { responsiveFontSizes } from "@mui/material";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import GameRoom from "./Pages/GameRoom";
import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#f17a0e",
        contrastText: "rgba(0,0,0,0.95)",
      },
      secondary: {
        main: "#0e83f1",
      },
      background: {
        default: "#002d39",
        paper: "#001f29",
      },
      error: {
        main: "#f10e12",
      },
      warning: {
        main: "#f1ed0e",
      },
      info: {
        main: "#0e83f1",
      },
      text: {
        primary: "#ffffff",
        secondary: "rgba(255,255,255,0.7)",
        disabled: "rgba(255,255,255,0.5)",
        hint: "rgba(255,255,255,0.5)",
      },
    },
  })
);

function App({ socket }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.emit("fetchRooms");
    socket.on("fetchRooms", (data) => {
      setRooms(data);
    });
    console.log("useEffect pickRoom");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  socket.on("roomCreated", (data) => {
    setRooms(data);
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Routes>
          <Route
            path="/"
            element={<HomePage socket={socket} rooms={rooms} />}
          />
          {rooms.lenght !== 0 &&
            rooms.map((room) => (
              <Route
                key={room.id}
                path={room.id}
                element={<GameRoom roomID={room.id} socket={socket} />}
              />
            ))}
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
