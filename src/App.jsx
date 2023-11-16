import Card from "@mui/material/Card";
// import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Popup from "./components/Popup";

import CheckboxList from "./components/CheckboxList";

import "./styles/app.css";
import { useState } from "react";

const App = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const handleOpen = () => setPopupOpen(true);
  const handleClose = () => setPopupOpen(false);

  console.log("isPopupOpen :>> ", isPopupOpen);
  return (
    <div className="app">
      <Card className="tasksCard">
        <Popup onClose={handleClose} isPopupOpen={isPopupOpen} />
        <Button
          endIcon={<AddIcon fontSize="small" />}
          variant="contained"
          color="success"
          onClick={handleOpen}
        >
          Добавить новую задачу
        </Button>
        <CheckboxList />
        <Button variant="contained" color="error">
          Удалить выполненные задачи
        </Button>
      </Card>
    </div>
  );
};

export default App;
