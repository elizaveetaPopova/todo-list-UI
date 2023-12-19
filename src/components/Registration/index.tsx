import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import './registration.css';
import { useAppDispatch } from '../../services/hooks';
import { register } from '../../services/store/authSlise';


const Registration = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<boolean | undefined>(false);
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstname] = useState<string>('');
  const [lastName, setLastname] = useState<string>('');
  const dispatch = useAppDispatch();

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    dispatch(register({
      email,
      password,
      firstName,
      lastName,
    }));
  };

  return (<div className="registerForm">
    <Box className="registerFormBox" component="form" onSubmit={handleSubmit}>
      <Typography sx={ {marginTop:'20px'}}>

        Заполните форму регистрации:
      </Typography>
      <TextField
        sx={ {marginTop:'20px'}}
        required
        label="Email"
        variant="outlined"
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
          setError(!isValidEmail(event.target.value));
          setEmail(event.target.value); 
        }}
        error={ error}
      />
      <TextField
        sx={ {marginTop:'20px'}}
        required
        label="Пароль"
        variant="outlined"
        value={password}
        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setPassword(event.target.value)}
      />
      <TextField
        sx={ {marginTop:'20px'}}
        className="textInput"
        required
        label="Имя"
        variant="outlined"
        value={firstName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setFirstname(event.target.value)}
      />
      <TextField
        sx={ {marginTop:'20px'}}
        className="textInput"
        required
        label="Фамилия"
        variant="outlined"
        value={lastName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setLastname(event.target.value)}
      />
      <Button sx={ {marginTop:'30px'}} className="formButton" variant="contained" type="submit" color="success">
        Зарегистрироваться
      </Button>
      <Button sx={ {marginTop:'10px'}} href="/" className="formButton" variant="outlined"  >
        Назад
      </Button>
    </Box>
  </div>);
};

export default Registration;