import React from 'react';
import { Grid, CircularProgress} from '@material-ui/core';

import Post from './Post/Post';
import useStyles from './styles';

// fetch the data in global redux store
import  {useSelector} from 'react-redux';


const Posts = ({setCurrentId}) =>{
  //how do we know to write posts? in the
  //index.js in reducers we named it posts
  //fetching data from redux
  ////from combineReducers
  const { posts, isLoading } = useSelector((state)=>state.posts); // { posts: [] }
  const classes = useStyles();


console.log('posts refreshed from posts component');

if(!posts.length && !isLoading) return 'No Posts';


  return (
//ternerary operator
//0is a falsy value
//The parenthesis in a function means we are returning a single value,
//the curly braces in a function means we are executing multiple lines of code.

//if we dont find the array show circle
isLoading ? <CircularProgress/> : (
  <Grid   className={classes.container} container spacing={3} >
  {
    posts.map((post) => (
      <Grid key={post._id} item xs={12} sm={12} md={6} lg={3} >
      <Post post={post} setCurrentId={setCurrentId}/>
      </Grid>
    ))
  }
  </Grid>
)
  );
}

export default Posts;
