import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopupStatus } from "./services/store/appSlice";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Popup from "./components/Popup";

import CheckboxList from "./components/CheckboxList";

import "./styles/app.css";
import { addNewTask, resetTask, updateTask } from "./services/store/taskSlice";

const App = () => {
  const task = useSelector((state) => state.tasks.task);

  const [title, setTitle] = useState(!task ? "" : task.title);
  const [description, setDescription] = useState(!task ? "" : task.title);

  useEffect(() => {
    setTitle(!task ? "" : task.title);
    setDescription(!task ? "" : task.description);
  }, [task]);

  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state) => state.app.isPopupOpen);
  const handleOpen = () => {
    dispatch(setPopupStatus(true));
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
  };

  const handleClose = () => {
    dispatch(setPopupStatus(false));
    dispatch(resetTask());
    resetForm();
  };

  const deleteTasks = () => {
    console.log("tasks deleted :>> ");
  };

  const handleSubmit = (e) => {
    if (!!title && !!description) {
      const taskBody = {
        title,
        description,
      };
      dispatch(
        !task
          ? addNewTask(taskBody)
          : updateTask({ id: task._id, body: taskBody })
      );
    }
  };
  return (
    <div className="app">
      <Card className="tasksCard">
        <Popup
          onClose={handleClose}
          isPopupOpen={isPopupOpen}
          title={title}
          description={description}
          setDescription={setDescription}
          setTitle={setTitle}
          handleSubmit={handleSubmit}
          task={task}
        />
        <Button
          endIcon={<AddIcon fontSize="small" />}
          variant="contained"
          color="success"
          onClick={handleOpen}
        >
          Добавить новую задачу
        </Button>
        <CheckboxList />
        <Button variant="contained" color="error" onClick={deleteTasks}>
          Удалить выполненные задачи
        </Button>
      </Card>
    </div>
  );
};

export default App;
