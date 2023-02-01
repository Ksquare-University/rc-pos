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
import { useDataContext } from '../../context/IncommingOrderContext';
import './style.css';
import { useAuth } from '../../context/AuthCtx';

const Login: React.FC = () => {
  const context = useDataContext();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [invalidLoginMsg, setInvalidLoginMsg] = useState('');
  const [invalidLoginMsgVisibility, setInvalidLoginMsgVisibility] =
    useState(false);
  const [loginErrorCount, setLoginErrorCount] = useState(0);
  const [passVisibility, setPassVisibility] = useState(false);
  const { logIn } = useAuth();

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
    setInvalidLoginMsgVisibility(false);

    try {
      const user = await logIn(inputs.email, inputs.password);
      console.log(user);

      if (!user) {
        throw new Error('No user found');
      }

      /* const role = user.user.reloadUserInfo.customAttributes
        .replace(/["{}]/g, '')
        .split(':')[1];

      console.log(role);

      if (role !== 'owner') {
        throw new Error('Unauthorized');
      } */

      const token = await user.user.accessToken;
      const uid = user.user.uid;

      context.setUserToken(token);

      const dbUserResponse = await fetch(
        `http://localhost:3010/manager/uid/${uid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const dbUser = await dbUserResponse.json();

      const restaurantId = dbUser.manager.restaurant_id;

      context.setRestaurantId(restaurantId);

      navigate('/home');
    } catch (error) {
      console.error(error);

      if (loginErrorCount < 5) {
        setInvalidLoginMsg('Incorrect or invalid credentials.');
        setLoginErrorCount((prev) => prev + 1);
      } else {
        setInvalidLoginMsg('Too many attempts, try later.');
        setLoginErrorCount(0);
      }

      setInvalidLoginMsgVisibility(true);
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleFormSubmit}>
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

          {invalidLoginMsgVisibility && (
            <Box
              border='1px solid #fe473c'
              borderRadius='6px'
              boxSizing={'border-box'}
              fontSize={'small'}
              marginBottom={'1vh'}
              marginTop='3vh'
              minWidth={'20vh'}
              padding='3%'
              width='88%'
            >
              {invalidLoginMsg}
            </Box>
          )}

          <TextField
            error={invalidLoginMsgVisibility}
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
