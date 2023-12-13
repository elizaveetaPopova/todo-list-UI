import React,{ useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import Popup from "../../components/Popup";
import CheckboxList from "../../components/CheckboxList";
import { setPopupStatus } from "../../services/store/appSlice";

import {
  addNewTask,
  removeTasks,
  resetTask,
  updateTask,
} from "../../services/store/taskSlice";
import "./todo.css";
import { RootState } from "../../services/store";
import { useAppDispatch } from "../../services/hooks";

const ToDo = () => {
  const { task, tasks } = useSelector((state: RootState) => state.tasks);
  const isPopupOpen = useSelector((state: RootState) => state.app.isPopupOpen);
  const [title, setTitle] = useState<string>(!task ? "" : task.title);
  const [description, setDescription] = useState<string>(!task ? "" : task.title);

  useEffect(() => {
    setTitle(!task ? "" : task.title);
    setDescription(!task ? "" : task.description);
  }, [task]);
  
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(setPopupStatus(true));
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
  };

  const handleClose: React.ReactEventHandler = () => {
    dispatch(setPopupStatus(false));
    dispatch(resetTask());
    resetForm();
  };

  const deleteTasks = () => {
    const removalTasks = tasks
      .filter((task) => task.status === true)
      .map((task) => task._id);
    dispatch(removeTasks(removalTasks));
  };

  const handleSubmit = () => {
    if (!!title && !!description) {
      const taskBody = {
        title,
        description,
      };
      if (!task) {dispatch(addNewTask(taskBody))} else {
        updateTask({ id: task._id, body: taskBody })
      }
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

export default ToDo;
