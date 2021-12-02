import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

function ChooseNickname({ setNicknameAndJoin }) {
  const [formNickname, setFormNickname] = useState("");
  return (
    <div>
      <Dialog open={true}>
        <DialogTitle>Type in your nickname</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nickname"
            label="Nickname"
            value={formNickname}
            type="name"
            onChange={(e) => setFormNickname(e.currentTarget.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNicknameAndJoin(formNickname)}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ChooseNickname;
