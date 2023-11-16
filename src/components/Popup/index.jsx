import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { addTask } from "../../redux/store/taskSlice";
import "./popup.css";

const Popup = ({ isPopupOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const addTodoTask = () => dispatch(addTask({ title, description }));

  return (
    <Modal className="modal" open={isPopupOpen}>
      <Box className="box" component="form">
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
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="buttonGroup">
          <Button variant="contained" color="success" onClick={addTodoTask}>
            Добавить задачу
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
