import React, { useState } from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

import moment from 'moment';

import { useNavigate} from 'react-router-dom';

import {useDispatch} from 'react-redux';
import {deletePost, likePost} from '../../../actions/posts';

import useStyles from './styles';



//destructure the props
const Post = ({ post, setCurrentId }) =>{
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);


const userId = (user?.result?.googleId || user?.result?._id);
const hasLikedPost =post.likes.find((like) => like === userId);

// the point of this is to reduce time it takes to like a post
//because we do not wait for the backend to update
const handleLike = async () => {
   dispatch(likePost(post._id));
   // checks wether did the user like this post
   if (hasLikedPost) {
     setLikes(post.likes.filter((id) => id !== userId))
   } else {
     setLikes([ ...post.likes, userId])
   }
 };



const deleteP =()=>{
   dispatch(deletePost(post._id))
   setCurrentId((prev) =>  !prev)
}

// const like = () =>{
//   dispatch(likePost(post._id))
// }

const openPost = () => navigate(`/posts/${post._id}`);


const Likes = () => {
  if (likes.length > 0) {
    return likes.find((like) => like ===userId)
      ? (
        <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
      ) : (
        <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
      );
  }
  return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
};


  return (
<Card raised elevation={6} className={classes.card}>

  <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
  <div className={classes.overlay}>
  <Typography variant='h6'>{post.name}  </Typography>
  <Typography variant='body2'>{moment(post.createdAt).fromNow()}  </Typography>
  </div>

  {(user?.result?.googleId === post?.creator ||  user?.result?._id ===  post?.creator) && (
    <div className={classes.overlay2}>
    <Button style={{color:'white'}} size='small' onClick={()=>setCurrentId(post._id)}>
    <MoreHorizIcon fontSize='medium'/>
    </Button>
    </div>
  )}

  <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >


  <div className={classes.details}>
  <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
  </div>
  <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
<CardContent>
  <Typography variant='body2' color='textSecondary' component='p' gutterBottom>{post.message.split(' ').splice(0, 20).join(' ')}</Typography>
  </CardContent>
  </ButtonBase>


<CardActions className={classes.cardActions}>

<Button size='small' color='primary'  disabled={!user?.result} onClick={handleLike}>
<Likes/>
</Button>

{(user?.result?.googleId === post?.creator ||  user?.result?._id ===  post?.creator) && (
  <Button size='small'
   color='primary'
    onClick={deleteP}>
  <DeleteIcon fontSize='small'/>Delete
  </Button>
)}

</CardActions>
</Card>
);
}

export default Post;
