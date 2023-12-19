import React, {useState} from 'react';
import { Box, Button, TextField } from '@mui/material';

import './login.css';
import { useAppDispatch } from '../../services/hooks';
import { loginStart } from '../../services/store/authSlise';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean|undefined>();

  const dispatch = useAppDispatch();

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginStart({email, password}));
  };

  return (
    <div className="loginForm">
      <Box className="loginFormBox" component="form" onSubmit={handleSubmit}>
        <TextField
          sx={ {marginTop:'20px'}}
          className="textInput"
          label="Email"
          variant="outlined"
          required
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            setError(!isValidEmail(e.target.value));
            setEmail(e.target.value);}}
          value={email}
          error={error}
        />
        <TextField
          sx={ {marginTop:'20px'}}
          className="textInput"
          label="Пароль"
          variant="outlined"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          value={password}
        />
        <Button sx={ {marginTop:'30px'}} variant="contained" className="formButton" type="submit" color="success">
          Войти
        </Button>
        <Button sx={ {marginTop:'10px'}} variant="contained" href="/registration" className="formButton"  type="submit">
          Регистрация
        </Button>
      </Box>
    </div>
  );
};

export default Login;
