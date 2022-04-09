import React, {useState} from 'react';
import {Avatar,TextField, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import LockedOutLinedIcon from '@material-ui/icons/LockOutlined'
import  {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { signIn, signUp} from '../../actions/auth';



import Icon from './icon'
import Input from './Input';
import useStyles from './styles';

const initialState = { firstName: '',
                       lastName: '',
                       email: '',
                       password: '',
                       confirmPassword: '',
                      }


const Auth = () => {
  const classes = useStyles();
  const  [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const handleSubmit = (event)=>{
    event.preventDefault();

    if(isSignUp){
      //pass the form data so we can have it in our db
      //navigate once something happens

      // redux flow - once the form is fiiled we want to dispatch an action (redux) #1
      dispatch(signUp(formData, navigate));
    }else{
      dispatch(signIn(formData, navigate));

    }
  };

//this function makes us write less code compared to the implement in Form.js
//where we hade to setstate for each tag
  const handleChange = (event)=>{
    const et = event.target;
    setFormData({ ...formData, [et.name]:et.value});
  };


  const switchMode = ()=>{
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  }


  const googleSuccess = async (res) => {
    // this makes sure we dont get an error if it fails ('?.'')
    const result = res?.profileObj;
    const token = res?.tokenId

      //since using async fun we can use try and catch
    try {
      //dispath aloows us to send data through our folders
      dispatch({ type: 'AUTH', data: {result, token} });
      //
      console.log('about to navigate');
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  };



  const googleFailure =(err) => {
    console.log('Google sign in failed');
    console.log(err);
  };


  return(
<Container component='main' maxWidth='xs'>
  <Paper className={classes.paper} elevation={3}>
    <Avatar className={classes.avatar}>
      <LockedOutLinedIcon/>
    </Avatar>
    <Typography variant='h5'>{isSignUp?'Sign Up':'Sign In'}</Typography>
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
      {
        isSignUp && (
          <>
            <Input
              name='firstName'
             label='First Name'
             handleChange={handleChange}
             autoFocus
             half
             />

             <Input
             name='lastName'
             label='Last Name'
             handleChange={handleChange}
             half
             />
          </>
        )}
        <Input
         name='email'
         label='Email Address'
         handleChange={handleChange}
          type='email'/>
        <Input
         name='password'
         label='Password'
         handleChange={handleChange}
          type={showPassword?'text':'password'}
          handleShowPassword={handleShowPassword}/>
        { isSignUp && <Input name='confirmPassword' label ='Repeat Password' handleChange={handleChange} type='password'/>}
      </Grid>

      <Button
      type='submit'
       fullWidth
       variant='contained'
       color='primary'
       className={classes.submit}>
        { isSignUp? 'Sign Up':'Sign In'}
      </Button>

      <GoogleLogin
        clientId='915789883992-8ufi20kgee1828pe4fkevavbmko9efca.apps.googleusercontent.com'
        render={(renderProps) => (
          <Button
          className={classes.googleButton}
          color='primary'
          fullWidth
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          startIcon={<Icon/>}
          variant='contained'>
          Google Sign In
          </Button>
          )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy='single_host_origin'
      />

      <Grid container justifyContent='flex-end'>
        <Grid item>
          <Button variant='contained' onClick={switchMode}>
            { isSignUp? 'Already Have An Account ? Sign In':'Dont Have An Account ? Sign Up'}
          </Button>
        </Grid>
      </Grid>
    </form>
  </Paper>
</Container>
  )
}

export default Auth;
