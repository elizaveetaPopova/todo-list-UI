import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleTask } from "../../redux/store/taskSlice";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

const CheckboxList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const dispatch = useDispatch();

  const onChangeCheckbox = (taskId) => {
    dispatch(toggleTask({ taskId }));
  };

  return (
    <FormGroup
      sx={{ overflowY: "scroll", flexWrap: "nowrap", marginTop: "20px" }}
    >
      {tasks?.map((task, index) => {
        return (
          <div key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => onChangeCheckbox(task.id)}
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
