import { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

import taskData from "../../mockData.json";

const CheckboxList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(taskData);
  }, []);

  const onChangeCheckbox = (targetId) => {
    let setTodo = tasks.map((task, index) => {
      if (targetId !== index) return task;
      return {
        ...task,
        status: !task.status,
      };
    });
    setTasks(setTodo);
  };

  return (
    <FormGroup
      sx={{ overflowY: "scroll", flexWrap: "nowrap", marginTop: "20px" }}
    >
      {tasks.map((task, index) => {
        return (
          <div key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => onChangeCheckbox(index)}
                  checked={task.status}
                />
              }
              label={task.title}
            />
            {index !== tasks.length - 1 && <Divider />}
          </div>
        );
      })}
    </FormGroup>
  );
};
export default CheckboxList;
