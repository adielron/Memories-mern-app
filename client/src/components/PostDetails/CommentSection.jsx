import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import {commentPost} from '../../actions/posts'


const CommentSection = ({ post }) => {
const classes = useStyles();
const [ comments, setComments] = useState(post?.comments);
const [comment, setComment] = useState('');
const user = JSON.parse(localStorage.getItem('profile'));
const dispatch = useDispatch();
const commentsRef = useRef();

const handleComment = async () => {
  const finalComment = `${user.result.name}: ${comment}`;
  const newComments = await dispatch(commentPost(finalComment, post._id));
  setComments(newComments);
  setComment('');
  //scrolling auto down
  commentsRef.current.scrollIntoView({ behavior: 'smooth'})

};
return (
      <div>
        <div className={classes.commentsOuterContainer}>
          <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant="h6" >comments</Typography>
            {comments.map((comment,index) => (
              <Typography gutterBottom key={index} variant="subtitle1">
                <strong>{comment.split(':')[0]}</strong>
                {comment.split(':')[1]}
              </Typography>
            ))}
            <div ref={commentsRef}/>
          </div>
          {user?.result?.name && (
          <div style={{width: '70%'}}>
            <Typography gutterBottom variant="h6" >Write a Comment</Typography>
            <TextField
              fullWidth
              rows={4}
              variant='outlined'
              label='comment'
              multiline
              value={comment}
              onChange={(e)=> setComment(e.target.value)}
            />
            <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
              Comment
            </Button>
          </div>
        )}
        </div>
      </div>

    );
  } ;

export default CommentSection;
