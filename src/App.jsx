import { useDispatch, useSelector } from "react-redux";
import { setPopupStatus } from "./services/store/appSlice";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Popup from "./components/Popup";

import CheckboxList from "./components/CheckboxList";

import "./styles/app.css";

const App = () => {
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state) => state.app.isPopupOpen);
  const handleOpen = () => {
    dispatch(setPopupStatus(true));
  };
  const handleClose = () => {
    dispatch(setPopupStatus(false));
  };

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
