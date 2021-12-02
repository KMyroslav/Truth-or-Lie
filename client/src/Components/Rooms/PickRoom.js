import {
  Container,
  Button,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

function PickRoom({ rooms }) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (rooms.length === 0) {
      alert("Currently there is no rooms, create one!");
      return;
    }

    setDrawerIsOpen(!drawerIsOpen);
  };

  const list = () => {
    if (rooms.length === 0) {
      return;
    }
    return (
      <Box
        sx={{ width: "auto" }}
        role="presentation"
        onClick={toggleDrawer()}
        onKeyDown={toggleDrawer()}
      >
        <List>
          {rooms.map(({ id, roomName, deckQuantity, deckSize }) => (
            <ListItem button key={id} onClick={() => navigate(id)}>
              <ListItemText
                primary={roomName}
                secondary={`Decks:${deckQuantity} Deck Size:${deckSize}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <Container key="RoomDrawer">
      <Button onClick={toggleDrawer()}>Join a room</Button>
      <Drawer anchor="bottom" open={drawerIsOpen} onClose={toggleDrawer()}>
        {list()}
      </Drawer>
    </Container>
  );
}

export default PickRoom;
