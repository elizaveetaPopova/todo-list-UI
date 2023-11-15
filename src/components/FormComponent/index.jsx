import { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

import taskData from "../../mockData.json";

const FormComponent = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(taskData);
  }, []);

  const onChangeCheckbox = (event) => {
    let updatedTasks = [...tasks];
    updatedTasks[event.target.name] = {
      ...updatedTasks[event.target.name],
      status: !updatedTasks[event.target.name].status,
    };

    setTasks(updatedTasks);
  };

  return (
    <FormGroup sx={{ overflowY: "scroll", flexWrap: "nowrap" }}>
      {tasks.map((task, index) => {
        return (
          <div key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={onChangeCheckbox}
                  checked={task.status}
                  name={`${index}`}
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
export default FormComponent;
