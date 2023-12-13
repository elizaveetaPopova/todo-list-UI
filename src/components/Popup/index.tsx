
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./popup.css";

interface TaskState {
  _id: string,
  title: string,
  description: string,
  status: boolean,
}

interface PopupProps {
  isPopupOpen: boolean,
  onClose: React.ReactEventHandler,
  title: string,
  description: string,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  setDescription: React.Dispatch<React.SetStateAction<string>>,
  handleSubmit: React.FormEventHandler<HTMLFormElement>,
  task: null | TaskState
}

const Popup: React.FC<PopupProps> = ({
  isPopupOpen,
  onClose,
  title,
  description,
  setTitle,
  setDescription,
  handleSubmit,
  task
}) => {
  return (
    <Modal className="modal" open={isPopupOpen}>
      <Box className="box" component="form" onSubmit={handleSubmit}>
        <div className="fieldGroup">
          <TextField
            fullWidth
            required
            id="outlined-multiline-flexible"
            label="Название задачи"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            sx={{ marginTop: "20px" }}
            fullWidth
            required
            multiline
            maxRows={16}
            id="outlined-multiline-flexible"
            label="Описание задачи"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>

        <div className="buttonGroup">
          <Button variant="contained" color="success" type="submit">
            {!task ? "Добавить задачу" : "Обновить задачу"}
          </Button>
          <Button
            sx={{ marginLeft: 2 }}
            variant="outlined"
            color="error"
            onClick={onClose}
          >
            Отмена
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default Popup;
