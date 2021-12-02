import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
// import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";

function CreateRoom({ createRoom }) {
  const [open, setOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [playersQuantity, setPlayersQuantity] = useState("2");
  const [deckQuantity, setDeckQuantity] = useState("1");
  const [deckSize, setDeckSize] = useState("52");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Room
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Configure room and game rules</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <TextField
                id="room-name"
                required
                value={roomName}
                onChange={(e) => {
                  setRoomName(e.target.value);
                }}
                label="Room Name"
                variant="outlined"
              />
            </FormControl>
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="players-Quantity">Players</InputLabel>
              <Select
                value={playersQuantity}
                onChange={(e) => {
                  setPlayersQuantity(e.target.value);
                }}
                label="PlayersQuantity"
                inputProps={{
                  name: "players-Quantity",
                  id: "players-Quantity",
                }}
              >
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
                <MenuItem value="10">10</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="Decks-count">Decks</InputLabel>
              <Select
                value={deckQuantity}
                onChange={(e) => {
                  setDeckQuantity(e.target.value);
                }}
                label="DecksCount"
                inputProps={{
                  name: "Decks-count",
                  id: "Decks-count",
                }}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="Deck-size">Deck Size</InputLabel>
              <Select
                value={deckSize}
                onChange={(e) => {
                  setDeckSize(e.target.value);
                }}
                label="DecksSize"
                inputProps={{
                  name: "Decks-size",
                  id: "Decks-size",
                }}
              >
                <MenuItem value="52">52</MenuItem>
                <MenuItem value="32">32</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              createRoom({ roomName, playersQuantity, deckQuantity, deckSize });
              handleClose();
            }}
          >
            Create Game
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CreateRoom;
