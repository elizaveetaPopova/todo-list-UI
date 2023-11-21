import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  toggleTask,
  removeTask,
} from "../../services/store/taskSlice";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./checkboxList.css";
import { Button } from "@mui/material";

const CheckboxList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  const { status, error, tasks } = useSelector((state) => state.tasks);
  // console.log("tasks :>> ", tasks);
  const onChangeCheckbox = (taskId) => {
    dispatch(toggleTask({ taskId }));
  };

  const deteleItem = (taskId) => {
    dispatch(removeTask(taskId));
  };

  return (
    <FormGroup
      sx={{ overflowY: "scroll", flexWrap: "nowrap", marginTop: "20px" }}
    >
      {status === "loading" && (
        <div className="loaderContainer">
          <p>loading...</p>
        </div>
      )}
      {error && <h2>{error}</h2>}
      {tasks?.map((task, index) => {
        return (
          <div key={index}>
            <div className="checkboxContainer">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => onChangeCheckbox(task._id)}
                    checked={task.status}
                  />
                }
                label={task.title}
              />
              <Button onClick={() => deteleItem(task._id)}>
                <HighlightOffIcon />
              </Button>
            </div>
            {index !== tasks.length - 1 && <Divider />}
          </div>
        );
      })}
    </FormGroup>
  );
};
export default CheckboxList;
