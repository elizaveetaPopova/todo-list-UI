import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import FormComponent from "./components/FormComponent";

import "./styles/app.css";

const App = () => {
  return (
    <div className="app">
      <Card className="tasksCard">
        <Button
          endIcon={<AddIcon fontSize="small" />}
          variant="contained"
          color="success"
        >
          Добавить новую задачу
        </Button>
        <FormComponent />
      </Card>
    </div>
  );
};

export default App;
