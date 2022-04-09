
import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';

//send data redux
import {useDispatch} from 'react-redux';
//fetch data redux
import  {useSelector} from 'react-redux';

import {useNavigate} from 'react-router-dom';
//this needs to be below imports from @mui
import useStyles from './styles';
import {createPost, updatePost} from '../../actions/posts';


const Form = ({currentId, setCurrentId}) =>{
  const [postData, setPostData] = useState({
    title: '',
    message:'',
    tags:'',
    selectedfile:'',
  });

  //if  current id is not false find from reducer the post with that id
  const updatedPost = useSelector((state)=> currentId ? state.posts.posts.find((p) => p._id===currentId) : null);
  //css
  const classes = useStyles();
  //send new post via redux
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('profile'));



//the second item (1,2) tells when to run the useEffect function
//when updatedPost changes from nothing to actual post
  useEffect(()=>{
    if (updatedPost) setPostData(updatedPost)
  },[updatedPost])




  const handleSubmit = (e) => {
    e.preventDefault();
    //when someone submits and there is an active current id
    if(currentId){
      dispatch(updatePost(currentId, {...postData, name:user?.result?.name }));
    } else{
      dispatch(createPost({...postData, name:user?.result?.name }, navigate));
    }
    clear();

  }

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      message:'',
      tags:'',
      selectedfile:'',
    })
  }


  if (!user?.result?.name){
    return(
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please sign in to post !
        </Typography>
      </Paper>

    )
  }


  return (
    //paper is like div with white background
    <Paper className={classes.paper} elevation={6} >
    <form
    autoComplete='off'
     noValidate
      className={`${classes.root} ${classes.form}`}
       onSubmit={handleSubmit}
       >
    <Typography variant='h6'> {currentId ? 'Editing': 'Creating'} a Memory</Typography>

      <TextField
      name='title'
      variant ='outlined'
       label='title'
        fullWidth
        value={postData.title}
        onChange={(e)=>setPostData({
          ...postData,title: e.target.value
        })}
        />
        <TextField
        name='message'
        variant ='outlined'
         label='message'
          fullWidth
          value={postData.message}
          onChange={(e)=>setPostData({
            ...postData,message: e.target.value
          })}
          />
          <TextField
          name='tags'
          variant ='outlined'
           label='tags'
            fullWidth
            value={postData.tags}
            onChange={(e)=>setPostData({
              ...postData,tags: e.target.value.split(',')
            })}
            />

<div className={classes.fileInput}>
<FileBase
type='file'
multiple={false}
//one distructurning getting base 64
onDone={({base64}) => setPostData({ ... postData, selectedFile:base64})}
/>
</div>

<Button
  className={classes.buttonSubmit}
 variant="contained"
  color="primary"
  size='large'
  type='submit'
  fullWidth
  > Submit
</Button>

<Button
variant="contained"
 color="secondary"
 size='large'
 onClick={clear}
 fullWidth
 >Clear
</Button>
    </form>
    </Paper>
  );
}

export default Form;
