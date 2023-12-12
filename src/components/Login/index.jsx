import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="loginForm">
      <Box className="loginFormBox" component="form" onSubmit={handleSubmit}>
        <TextField
          className="textInput"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          required
          onChange={(e) => onChangeEmail(e)}
          value={email}
        />
        <TextField
          className="textInput"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          required
          onChange={(e) => onChangePassword(e)}
          value={password}
        />
        <Button className="formButton" variant="outlined" type="submit">
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;
