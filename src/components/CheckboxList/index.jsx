import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import './checkboxList.css';
import { Button } from '@mui/material';

import { setPopupStatus } from '../../services/store/appSlice';
import {
  fetchTasks,
  updateTask,
  removeTask,
  fetchTask,
} from '../../services/store/taskSlice';

const CheckboxList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  const { status, error, tasks } = useSelector((state) => state.tasks);

  const onChangeCheckbox = (taskId) => {
    const taskStatus = tasks.find((task) => task._id === taskId);
    dispatch(updateTask({ id: taskId, body: { status: !taskStatus.status } }));
  };

  const deleteTask = (taskId) => {
    dispatch(removeTask(taskId));
  };

  const editTask = (taskId) => {
    dispatch(setPopupStatus(true));
    dispatch(fetchTask(taskId));
  };

  return (
    <FormGroup
      sx={{ overflowY: 'scroll', flexWrap: 'nowrap', marginTop: '20px' }}
    >
      {status === 'loading' && (
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
              <div>
                <Button onClick={() => editTask(task._id)}>
                  <EditIcon />
                </Button>
                <Button onClick={() => deleteTask(task._id)}>
                  <HighlightOffIcon />
                </Button>
              </div>
            </div>
            {index !== tasks.length - 1 && <Divider />}
          </div>
        );
      })}
    </FormGroup>
  );
};
export default CheckboxList;
