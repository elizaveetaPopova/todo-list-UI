import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToDo from "./containers/Todo";
import Main from "./containers/Main";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/todo" element={<ToDo />} />
      </Routes>
    </Router>
  );
};

export default App;
