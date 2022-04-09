import React, {useState, useEffect} from 'react';
import {AppBar,Button,Toolbar,Avatar, Typography} from '@material-ui/core';

import memories from '../.././images/memories.png';
import logo from '../.././images/eye.png';
import text from '../.././images/text.png';



import {useDispatch} from 'react-redux'
//
import {useNavigate, Link, useLocation} from 'react-router-dom'

import decode from 'jwt-decode';


import useStyles from './styles';

const Navbar = ({change, setChange}) => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();



   const logout =()=>{
    dispatch({type:'LOGOUT'});
    navigate('/');
    setUser(0);
    //addd this to reload react components
    setChange((prev)=> !prev )
  }


  useEffect(() =>{
    console.log('use effect ran from nav ');
    const token = user?.token;

    if (token){
      const decodedToken = decode(token)
      console.log(decodedToken.exp);
      console.log(new Date().getTime());

      if(decodedToken.exp*1000 < new Date().getTime()) logout();
    }
    //for the first time the app storage is empty
    //so user is null thats why we setUser bellow
    setUser(JSON.parse(localStorage.getItem('profile')))
    //empty array means it runs only once
    //when location aka-pageUrl changes we useEffect
  }, [location])


  return (
<AppBar className = {classes.appBar} position='static' color='inherit'>
  <Link to="/" className={classes.brandContainer}>

  <img className = {classes.image} src={text} alt='icon' height='45px'/>
    <img className = {classes.image} src={logo} alt='icon' height='40px'/>
  </Link>
  <Toolbar className={classes.toolbar}>
    {user ?
      (
      <div className={classes.profile}>
        <Avatar
        className={classes.purple}
        alt={user.result.name}
        src={user.result.imageUrl} >{user.result.name.charAt(0)}</Avatar>
        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
      </div>
    )
    :
    (
      <Button component={Link} to="/auth" variant='contained'  color='primary'>Sign In</Button>
    )
  }
  </Toolbar>
</AppBar>

  );
}

export default Navbar;
