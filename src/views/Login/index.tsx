import React, { useState } from 'react';
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import rappiLogo from '../../assets/rappi_logo.png';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import "./style.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [passVisibility, setPassVisibility] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePassVisibility = () => {
    setPassVisibility((prevState) => !prevState);
  };

  const handleFormSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if (inputs.email.length > 4 && inputs.password.length > 6) {
      const user = await signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );

      console.log(user);
      console.log(await user.user.getIdToken());
      console.log(inputs);
      navigate('/home');
    }
  };
  return (
    <div className="login-container">
      <form 
        onSubmit={handleFormSubmit}>
        <Box
          bgcolor={'#f0f0f0'}
          overflow='hidden'
          display='flex'
          flexDirection={'column'}
          maxWidth='75vw'
          alignItems='center'
          margin={'auto'}
          marginBottom='5vh'
          justifyContent={'center'}
          padding={3}
          borderRadius={5}
          boxShadow={'4px 4px 8px #202020'}
          color='#fe473c'
          sx={{
            ':hover': {
              boxShadow: '5px 5px 10px #202020',
            },
          }}
        >
          <Typography
            fontFamily={'Quicksand'}
            variant='h3'
            padding={2}
            paddingBottom={1}
            paddingTop={0}
            textAlign='center'
          >
            Welcome
            <br />
            Back!
          </Typography>

          <img
            src={rappiLogo}
            alt='RappiPoS'
            style={{
              height: '8%',
              minWidth: '95px',
              maxWidth: '15vh',
              marginBottom: '3%',
            }}
          />

          <TextField
            id='email'
            margin='normal'
            name='email'
            onChange={handleInputChange}
            label='Email'
            required={true}
            sx={{ width: '88%', minWidth: '20vh' }}
            type={'email'}
            value={inputs.email}
          />

          <TextField
            id='password'
            InputProps={{
              endAdornment: (
                <InputAdornment
                  tabIndex={0}
                  position='end'
                  onClick={handlePassVisibility}
                  sx={{ cursor: 'pointer' }}
                >
                  {passVisibility ? (
                    <VisibilityOffRoundedIcon />
                  ) : (
                    <VisibilityRoundedIcon />
                  )}
                </InputAdornment>
              ),
            }}
            helperText={
              !inputs.password ? 'Required.' : 'Do not expose your password.'
            }
            margin='normal'
            name='password'
            onChange={handleInputChange}
            label='Password'
            required={true}
            sx={{ width: '88%', minWidth: '20vh' }}
            type={passVisibility ? 'text' : 'password'}
            value={inputs.password}
          />

          <Button
            endIcon={<LoginRoundedIcon />}
            size='large'
            type='submit'
            variant='contained'
            sx={{
              color: '#ffffff',
              backgroundColor: '#fe473c',
              margin: '3%',
              paddingBottom: '5%',
              paddingLeft: '10%',
              paddingRight: '10%',
              width: '88%', 
              minWidth: '20vh',
              padding: '5%',
              
              ':hover': {
                backgroundColor: '#c40013',
              },
            }}
          >
            Login
          </Button>
        </Box>
      </form>
    </div>
  );

};

export default Login;
